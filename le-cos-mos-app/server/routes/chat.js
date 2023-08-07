const express = require("express");
const router = express.Router();
const Group = require("./chat.group.model");
const User = require("./user.model");
// Download File  //
const url = "mongodb+srv://test:Samsam123@cluster0.pcin2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const co = mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

})

const jwt = require('jsonwebtoken');
let authenticate = (req,res,next) => {  /* MIDDLEWARE for checking if the access-token has expired */

let token = req.header('x-access-token') // We intercept each request, taking the access-Token of the current user logged in
  jwt.verify(token,User.getJWTSecret(),(err,decoded)=>{// We decrypt the token, and if it the token is empty or not valid, the user get disconnected
   if(err) {
     // Do not Authenticate
     res.status(401).send(err)
   } else {
     req.user_id = decoded._id
     next()
   }
  })
}

// File related
const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
const storage = new GridFsStorage({ url:url,
   file: (req, file) => {
        return {
          filename: file.originalname.replace(/â/,'\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, "")
        }
}  });
const upload = multer({ storage:storage }).array("file"); // Single for 1 file, array for multiple


// End File related


const sendMessage = router.post("/discussion/message/send", async function (req, res, next) {
  let discussionId = req.query.discussionId
  var message = req.body.messageMetaData
  let _id = req.query._id
  let parsedMessage = {message:message.message,emiter:message.emiter,date:message.date,filesName:message.filesName,user_id:_id}

 await Group.find({_id: discussionId}).then((group) => {
  // group.message_list.push(parsedMessage)
  group[0].message_list.push(parsedMessage)

  // group.user_list
  group[0].save()

 return res.status(200).send(group[0].message_list)
 }).catch((e) => {
  res.status(404).send("User not Found")
 })

})

const saveMessageFile = router.post("/discussion/message/file/save", async function (req, res, next) {
  await new Promise((reject,resolve) =>{
    upload(req, res, async function (err) {
      if (err) {

        return reject() ;
      } else {
        return resolve()
      }
  })}).then((resolvedData) =>{
    return res.status(200).send()
  }).catch((rejectData) => {
    return res.status(501).send()
  })
})
const { GridFSBucket } = require('mongodb');

let gfs
let gfs2
let con = mongoose.connection.once('open',() => {
  const { mongo } = mongoose;
  const db = con.db;
  const bucket = new GridFSBucket(db);
  gfs = { bucket };
  const profil_bucket = new GridFSBucket(db, { bucketName: 'profil_bucket.fs' });
  gfs2 = { profil_bucket };
})
// const mongoDriver = mongoose.mongo;
// const db = mongoDriver.DBRef;
// let bucket = new GridFSBucket(con)



// Route pour télécharger un fichier
const downLoadFile = router.get('/file', authenticate, (req, res) => {

  const filename = req.query.filename.replace(/’/g,'\'').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  // Recherche du fichier dans GridFS
    // Création d'un flux de lecture pour le fichier
    // Envoi du fichier au client

    storage.db.collection('fs.files').findOne({filename:filename}).then((file) => {
      if(file == undefined || file == null) {
        return res.status(404).send("File not found")
      } else {

        const fileToSend = gfs.bucket.openDownloadStreamByName(filename);


        res.set('Content-Disposition', `attachment; filename="${filename}"`);
        res.set('Content-Type', 'application/octet-stream');
        res.set('Content',fileToSend)
        res.attachment(filename)
        fileToSend.pipe(res)
      }
    })
});

/* //////////////////////////// Getrelated method //////////////////////////// */
const getPrivateDiscussionGroup = router.get("/discussion/private",authenticate, async function (req, res, next) {
  let user_id = req.query._id
  await  Group.find({discussionType: 'private',user_list: {
    $elemMatch: { _id: user_id }
  }}).then((group) => {
    if(group.length == 0) {
      return res.status(400).send()
    }
    return res.status(200).send(group)
    }).catch((e) =>{
      return res.status(400).send()
    })
})


const getGlobalDiscussionGroup = router.get("/discussion/global",authenticate, async function (req, res, next) {
  let user_id = req.query._id
  await  Group.find({discussionType: 'global',user_list: {
    $elemMatch: { _id: user_id }
  }}).then((group) => {
    if(group.length == 0) {

      return res.status(400).send()
    }

    return res.status(200).send(group)
    }).catch((e) =>{
      return res.status(400).send()
    })
})

const getProfilePictureList = router.get("/discussion/message/profilPicture/list", async function (req, res, next) {
let user_idList = req.query.user_id

return new Promise(async (resolve, reject) => {
  await storage.db.collection('profil_bucket.fs.files').findOne({ filename: user_idList }).then((file) => {


    if(!file) {
      return res.status(400).send("File not found")
    }
    // if(!uniquePicture.includes(file.filename)) {
      // uniquePicture.push(file.filename)
      const fileStream = gfs2.profil_bucket.openDownloadStreamByName(file.filename);
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
    return res.status(200) // Do not send()
  }).catch((e) =>{
    console.log(e)
        return res.status(500).send("Internal server error");
  });

})

})

const getMessageList = router.get("/discussion/message/list",authenticate, async function (req, res, next) {

  //let name = req.body.name
  var discussionId = req.query.discussionId
if(!discussionId) {
  return res.status(404).send()
}
let limit_message_length = req.query.message_list_length || 25
let list = []
 await new Promise(async (resolve,reject) => {
 await Group.findOne({_id:discussionId}).then((group) => {
  if(!group || group == null) {
    reject(null)
    return
  }
 for(let i = 1; i <= limit_message_length && i <= group.message_list.length ;i++) { // We just take the 25 last messages
   list.push(group.message_list[group.message_list.length - i])
    }
   resolve(null)
   }).catch((e) =>{
    return res.status(400).send()
   })

 }).then((resolved) => {
  return res.status(200).send(list.reverse())
 }).catch((rejected) => {
  return res.status(200).send([])
 })
})


const modifyDiscussionName = router.post("/discussion/modify",authenticate, async function (req, res, next) {
let newName = req.body.newName
let discussionId = req.body.discussionId
Group.findOneAndUpdate({_id:discussionId},{ $set: {name:newName}}).then((data) => {
return res.status(200).send()
})

})

const delDiscussion = router.post("/discussion/del",authenticate, async function (req, res, next) {
  let discussionId = req.body.discussionId

  Group.findOneAndDelete({_id:discussionId}).then((data) => {})

  return res.status(200).send()
  })

  const createCombinedDiscussion = router.post("/discussion/combine/create",authenticate, async function (req, res, next) {

    let user_list = req.body;
    let discusionId = req.query._id
      Group.findByIdAndUpdate(  { _id: discusionId },
        { $push: { user_list: { $each: user_list } } }).then((group) =>{

          return res.status(200).send()

      }).catch((e) =>{
        console.log(e)
        return res.status(500).send()
      })



  })
  const createDiscussion = router.post("/discussion/create",authenticate, async function (req, res, next) {

    let body = req.body;
    let user_id = req.query._id
    let name = body.name

    if((name == ' ') || (name == '') || (body.length == 0)) {
      return res.status(400).send()
    }
    let discussionType = body.discussionType

    let newDiscussion = new Group({name:name,discussionType:discussionType})


    const response = await newDiscussion.save().then((resulting) =>{
        User.findOneAndUpdate({_id:user_id},{ $push: {groupsNameDiscussionBelonging:{discussionName:name,discussionId:newDiscussion._id}}}).then((user) => {

          Group.findOneAndUpdate({_id:newDiscussion._id},{$push:{user_list:user}}).then((resulting ) =>{
            return res.status(200).send()
          })

        })

    }).catch((e) =>{
      if(e.code == 11000) {
        return res.status(409).send("Discussion name already exist")
      }
      return res.status(400).send("Unknown error")
    });

    });


    const createSingleDiscussion = router.post("/discussion/single/create", async function (req, res, next) {

      let selectedUser_id = req.body.selectedUser_id
      let _id = req.body._id

      User.findOne({_id:_id}).then((creator) =>{
       User.findOne({_id:selectedUser_id}).then((selected)=>{
        let newGroup = new Group({discussionType:'private',user_list:[creator,selected],name:`${creator._id}-${selected._id}`,message_list:[]})
        newGroup.save().then((group) =>{
        creator.groupsNameDiscussionBelonging.push({discussionId:group._id,discussionName:group.name})
        creator.save().then((creator) =>{
          selected.groupsNameDiscussionBelonging.push({discussionId:group._id,discussionName:`${creator.firstname} ${creator.lastname}`})
          selected.save().then((selected) =>{
            return res.status(200).send()
          })
        })

        }).catch((e) =>{
          // Duplicate groupName
          return res.status(400).send()
        })
       }).catch((e) =>{
        return res.status(404).send()
       })
      }).catch((e) =>{
        return res.status(404).send()
      })
    })


const setUserInConversation = router.post("/discussion/user/add",/*authenticate,*/ function (req, res, next) {

      let discussionId = req.body.discussionId
      let groupName = req.body.groupName
      let userList = req.body.userList

for(let i = 0;i < userList.length;i++) {
  Group.updateOne({_id:discussionId},{$push:{user_list:userList[i]}}).then((group) => {

    User.updateOne({_id:userList[i]._id},{$push:{groupsNameDiscussionBelonging:{discussionName:groupName,discussionId:discussionId}}}).then((user) => {

    })

  })
}
return res.status(200).send()
   })


   const delUserFromConversation = router.post("/discussion/user/del",/*authenticate,*/ function (req, res, next) {

    let user = req.body.user
    let discussionId = req.body.discussionId
    Group.updateOne({_id:discussionId},{ $pull: {user_list: {_id: { $in: [ user._id] }}}}).then(() => {
      User.updateOne({_id:user._id},{$pull:{groupsNameDiscussionBelonging:{discussionId:discussionId}}}).then((user) => {

        return res.status(200).send()
      })
    })



   })










module.exports = router;
