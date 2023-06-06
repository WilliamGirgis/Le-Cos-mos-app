const express = require("express");
const router = express.Router();
const url = "mongodb+srv://test:Samsam123@cluster0.pcin2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const co = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
})
var crypto = require("crypto");
const { GridFSBucket } = require('mongodb');
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
let gfs
let dbg
let con = mongoose.connection.once('open',() => {
   dbg = con.db;
  const publications_bucket = new GridFSBucket(dbg, { bucketName: 'publication_bucket.fs' });
  gfs = { publications_bucket };
})

const publicationSchema = new mongoose.Schema({

  title:{
    type:String,
    unique:false,
    required:false
  },

  date: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: false
  },
  extension:{
    type: String,
    required: false
  },
img_id: {
  type:String,
  required:false
}



})

const Publication = mongoose.model('Publication', publicationSchema);
module.exports = Publication

const storage = new GridFsStorage({ url:url,
  file: (req, file) => {
    let name = file.originalname.replace(/â/,'\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, "")

let title = req.additionalData.title
let date = req.additionalData.date
let description = req.additionalData.description
let imgid = req.additionalData.imgid
let extension = name.split(/\./)[name.split(/\./).length - 1]
    return {
      filename: name,
      bucketName: 'publication_bucket.fs',
      metadata: {
        'title': title,
        'date': date,
        'description':description,
        'imgid':imgid,
        'extension':extension
      }
    }

}  });
const upload = multer({ storage:storage }).single("file"); // Single for 1 file, array for multiple



let savePublication = router.post("/publish", async function (req, res, next) {

  await new Promise((reject,resolve) =>{
    let title = req.headers.title
    let description = req.headers.description
    let extension = req.headers.extension
    let today = new Date();

    let parsedToday = today.getDate()  + "-" + (today.getUTCMonth()+1) + "-" + today.getFullYear();
    var id = crypto.randomBytes(10).toString('hex');
let publication = new Publication({title:title,date:parsedToday,description:description,img_id:id,extension:extension})
publication.save().then((resulting) =>{
  req.additionalData = {
    title: title,
    description: description,
    date:parsedToday,
    imgid:id
    // Add more additional data fields as needed
  };
  upload(req, res, async function (err) {
    if (err) {
  console.log(err)
      return reject() ;
    } else {
      return resolve()
    }
  })
})
}).then((resolvedData) =>{
  return res.status(200).send()
}).catch((rejectData) => {
return res.status(501).send()
})
});

let getAllPublication = router.get("/publishGet/all", async function (req, res, next) {
  let arrayPublication = await Publication.find({ filename: {$regex:''}})
  if(arrayPublication == null) {
    return res.status(400).send([])
  }
  return res.status(200).send(arrayPublication)
})


let getPublication = router.get("/publishGet", async function (req, res, next) {
  let imgid = req.query.imgid
  return new Promise(async (resolve, reject) => {
    await storage.db.collection('publication_bucket.fs.files').findOne({ 'metadata.imgid': imgid }).then((file) => {



      if(!file) {

        return res.status(400).send("File not found")
      }
      // if(!uniquePicture.includes(file.filename)) {
        // uniquePicture.push(file.filename)
        const fileStream = gfs.publications_bucket.openDownloadStreamByName(file.filename);
       res.set('Content-Disposition', `attachment; filename="${file.filename}"`);
       res.set('Content-Type', 'application/octet-stream');


       fileStream.on('end', () => {

        resolve();
      });

      fileStream.on('error', (error) => {
        reject(error);
      });
      fileStream.pipe(res)
      // }
    }).then((terminate) =>{

    }).catch((e) =>{
      console.log(e)
          return res.status(500).send("Internal server error");
    });

  }).then((result) =>{      return res.status(200)})


});


let deleteSpecificImage = router.post("/publish/file/del",function (req,res,next) {
  let img_id = req.body.img_id
  if (storage.db.collection('publication_bucket.fs.files') == null) {
    return res.status(404).send()
  }
  storage.db.collection('publication_bucket.fs.files').findOne({ 'metadata.imgid': img_id }).then((result) => {
    let tempPub = result
    const deletedFileId = result._id
    const bucket = new GridFSBucket(dbg, { bucketName: 'publication_bucket.fs' });
    bucket.delete(deletedFileId).then((result) => {

      Publication.findOne({img_id:img_id}).then((publication) =>{
        publication.img_id = ''
        publication.save().then((resulting) =>{
          return res.status(200).send()
        })

      })

    }).catch((e) => {
      if (e) {
        // To make sure the client request getFiles() again.
        // "File not found for id 646a849c5aea81a3d4a74519" Was triggered, even though the chuks were all deleted
        console.log(e)

      }
    });
  }).catch((e) => {
    console.log(e)
    return res.status(200).send(e) // Need 200 to call next http quest on client side. To fixe
  })
})

//https://stackoverflow.com/questions/23774231/how-do-i-remove-all-null-and-empty-string-values-from-an-object
let delPublicationImg = router.post("/publish/del", function (req, res, next) {
  let img_id = req.body.img_id
  if (storage.db.collection('publication_bucket.fs.files') == null) {
    return res.status(404).send()
  }
  storage.db.collection('publication_bucket.fs.files').findOne({ 'metadata.imgid': img_id }).then((result) => {
console.log(result)
    if(!result) {
   Publication.findOneAndDelete({img_id:img_id}).then((result) =>{
    return res.status(200).send();
   })

    }
    const deletedFileId = result._id
    const bucket = new GridFSBucket(dbg, { bucketName: 'publication_bucket.fs' });
    bucket.delete(deletedFileId).then((result) => {

    }).catch((e) => {
      if (e) {
        console.log(e)
        return res.status(200).send();
      }
    });
    return res.status(200).send()
  }).catch((e) => {
    console.log(e)
    return res.status(200).send(e) // Need 200 to call next http quest on client side. To fixe
  })
});

let modifyPublication = router.post(
  "/publish/modify",
  function (req, res, next) {

    let oldTitle = req.headers.oldtitle
    var img_id = crypto.randomBytes(10).toString('hex');
    let newTitle = req.headers.title;
    let newDate = req.headers.givendate;
    let newContent = req.headers.givendescription;
    let extension = req.headers.extension
    let oldImg_id = req.headers.img_id

    Publication.findOne({img_id:oldImg_id}).then((publication) =>{
      publication.img_id = img_id
      publication.date = newDate
      publication.description = newContent
      publication.extension = extension
      publication.title = newTitle
      publication.save().then((resulting )=> {

        if (storage.db.collection('publication_bucket.fs.files') == null) {
          return res.status(404).send()
        }
        storage.db.collection('publication_bucket.fs.files').findOne({'metadata.imgid':oldImg_id,'metadata.title':oldTitle }).then((result) => {
          req.additionalData = {
            title: newTitle,
            description: newContent,
            date:newDate,
            imgid:img_id
            // Add more additional data fields as needed
          };
          if(result == null) {

      upload(req, res, async function (err) {
        if (err) {
      console.log(err)
          return res.status(200).send()
        } else {
          return res.status(400).send()
        }
      })
    } else {
      const deletedFileId = result._id
      const bucket = new GridFSBucket(dbg, { bucketName: 'publication_bucket.fs' });
              // File successfully deleted from the GridFS bucket
              req.additionalData = {
                title: newTitle,
                description: newContent,
                date:newDate,
                imgid:img_id
                // Add more additional data fields as needed
              };


              bucket.delete(deletedFileId).then((result) => {
                upload(req,res, function (err) {

                  return res.status(200).send()
                })
              }).catch((e) => {
                if (e) {
                  // To make sure the client request getFiles() again.
                  // "File not found for id 646a849c5aea81a3d4a74519" Was triggered, even though the chuks were all deleted
                  console.log(e)
                  return res.status(200).send();
                }
              });
    }

        }).catch((e) => {
          console.log(e)
          return res.status(200).send(e) // Need 200 to call next http quest on client side. To fixe
        })

      })
    })


  }
);


module.exports = router;
