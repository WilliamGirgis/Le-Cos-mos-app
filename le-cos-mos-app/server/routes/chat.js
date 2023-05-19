const express = require("express");
const router = express.Router();
const Group = require("./chat.group.model");
const User = require("./user.model");
// Download File  //
const url = "mongodb+srv://test:Samsam123@cluster0.pcin2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const co = mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    //console.log('Connected successfuly')

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
    console.log(file)
        return {
          filename: file.originalname.replace(/â/,'\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, ""),
        }
}  });
const upload = multer({ storage:storage }).array("file"); // Single for 1 file, array for multiple

// End File related


const sendMessage = router.post("/discussion/message/send",authenticate, async function (req, res, next) {
  let groupName = req.query.groupName
  var message = req.body.messageMetaData
  let parsedMessage = {message:message.message,emiter:message.emiter,date:message.date,filesName:message.filesName}

 await Group.find({name: groupName}).then((group) => {
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
let con = mongoose.connection.once('open',() => {
  const { mongo } = mongoose;
  const db = con.db;
  const bucket = new GridFSBucket(db);
  gfs = { bucket };
})
// const mongoDriver = mongoose.mongo;
// const db = mongoDriver.DBRef;
// let bucket = new GridFSBucket(con)



// Route pour télécharger un fichier
const downLoadFile = router.get('/file', (req, res) => {
  console.log(req.query.filename)
  const filename = req.query.filename.replace(/’/g,'\'');
  console.log(filename)
  // Recherche du fichier dans GridFS
    // Création d'un flux de lecture pour le fichier
    // Envoi du fichier au client

    storage.db.collection('fs.files').findOne({filename:filename}).then((file) => {
      console.log(file)
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



        // do something with the stream




    // return res.status(200).send()



});

/* //////////////////////////// Getrelated method //////////////////////////// */
const getPrivateDiscussionGroup = router.get("/discussion/private",authenticate, async function (req, res, next) {
  await  Group.find({discussionType: 'private'}).then((group) => {
    if(group.length == 0) {
      return res.status(400).send()
    }
    return res.status(200).send(group)
    })
})


const getGlobalDiscussionGroup = router.get("/discussion/global",authenticate, async function (req, res, next) {
  await new Promise(async (resolve,reject) =>{
  await Group.find({discussionType: 'global'}).then((group) => {
    if(group.length == 0) {
      reject(null)
    } else {
      resolve(group)
    }
   })
}).then((groupresolved) =>{
  return res.status(200).send(groupresolved)


}).catch((rejected) =>{
  return res.status(400).send()
})
})

const getMessageList = router.get("/discussion/message/list",authenticate, async function (req, res, next) {

  //let name = req.body.name
  var groupName = req.query.groupName
if(!groupName) {
  return res.status(404).send()
}
let limit_message_length = req.query.message_list_length || 25
let list = []
 await new Promise(async (resolve,reject) => {
 await Group.findOne({name:groupName}).then((group) => {
  if(!group || group == null) {
    reject(null)
    return
  }
 for(let i = 1; i <= limit_message_length && i <= group.message_list.length ;i++) { // We just take the 25 last messages
   list.push(group.message_list[group.message_list.length - i])
    }
   resolve(null)
   })

 }).then((resolved) => {
  return res.status(200).send(list.reverse())
 }).catch((rejected) => {
  return res.status(200).send([])
 })
})


const modifyDiscussionName = router.post("/discussion/modify",authenticate, async function (req, res, next) {
let newName = req.body.newName
let oldName = req.body.oldName
if(oldName === newName) {
  return
}
Group.findOneAndUpdate({name:oldName},{ $set: {name:newName}}).then((data) => {

return res.status(200).send()
})

})

const delDiscussion = router.post("/discussion/del",authenticate, async function (req, res, next) {
  let name = req.body.groupName

  Group.findOneAndDelete({name:name}).then((data) => {})

  return res.status(200).send()
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

    const response = await newDiscussion.save();
    if(discussionType == 'private') {
      User.findOneAndUpdate({_id:user_id},{ $push: {groupsNameDiscussionBelonging:name}}).then((user) => {
return res.status(200).send()
      })
    }
    });



const setUserInConversation = router.post("/discussion/user/add",/*authenticate,*/ function (req, res, next) {

      let groupName = req.body.name
      let userList = req.body.userList

for(let i = 0;i < userList.length;i++) {
  Group.updateOne({name:groupName},{$push:{user_list:userList[i]}}).then((group) => {

    User.updateOne({_id:userList[i]._id},{$set:{groupsNameDiscussionBelonging:groupName}}).then((user) => {

    })

  })
}
return res.status(200).send()
   })


   const delUserFromConversation = router.post("/discussion/user/del",/*authenticate,*/ function (req, res, next) {

    let user = req.body.user
    let groupName = req.body.groupName
    Group.updateOne({name:groupName},{ $pull: {user_list: {_id: { $in: [ user._id] }}}}).then(() => {
      User.updateOne({_id:user._id},{$set:{groupsNameDiscussionBelonging:''}}).then((user) => {

        return res.status(200).send()
      })
    })



   })










module.exports = router;
