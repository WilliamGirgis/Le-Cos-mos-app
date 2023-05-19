const express = require("express");
const router = express.Router();
const { GridFSBucket } = require('mongodb');
const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
const User = require("./user.model");
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




//
const td_file_storage = new GridFsStorage({ url:url,
  file: (req, file) => {
    console.log(file)
       return {
         filename: file.originalname.replace(/â/,'\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, ""),
         bucketName:'td_bucket.fs',
         metadata:{
          'type':'Travaux dirigés',
          'courName':req.additionalData.courName
         }
       }
}  });
const upload_td_file = multer({ storage:td_file_storage }).array("file");
//
const cm_file_storage = new GridFsStorage({ url:url,
  file: (req, file) => {
       return {
         filename: file.originalname.replace(/â/,'\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, ""),
         bucketName:'cm_bucket.fs',
         metadata:{
          'type':'Cours Magistraux',
          'courName':req.additionalData.courName
         }
       }
}  });
const upload_cm_file = multer({ storage:cm_file_storage }).array("file");
//
const annal_file_storage = new GridFsStorage({ url:url,
  file: (req, file) => {
       return {
         filename: file.originalname.replace(/â/,'\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, ""),
         bucketName:'annal_bucket.fs',
         metadata:{
          'type':'Annal',
          'courName':req.additionalData.courName
         }
       }
}  });
const upload_annal_file = multer({ storage:annal_file_storage }).array("file");

//
const video_file_storage = new GridFsStorage({ url:url,
  file: (req, file) => {
       return {
         filename: file.originalname.replace(/â/,'\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, ""),
         bucketName:'video_bucket.fs',
         metadata:{
          'type':'Video',
          'courName':req.additionalData.courName
         }
       }
}  });
const upload_video_file = multer({ storage:video_file_storage }).array("file");

//
const exercice_file_storage = new GridFsStorage({ url:url,
  file: (req, file) => {
       return {
         filename: file.originalname.replace(/â/,'\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, ""),
         bucketName:'exercice_bucket.fs',
         metadata:{
          'type':'Exercice',
          'courName':req.additionalData.courName
         }
       }
}  });
const upload_exercice_file = multer({ storage:exercice_file_storage }).array("file");

//
const planchage_file_storage = new GridFsStorage({ url:url,
  file: (req, file) => {
       return {
         filename: file.originalname.replace(/â/,'\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, ""),
         bucketName:'planchage_bucket.fs',
         metadata:{
          'type':'Planchage',
          'courName':req.additionalData.courName
         }
       }
}  });
const upload_planchage_file = multer({ storage:planchage_file_storage }).array("file");


// End File related

// Files buckets initialisation
let td_bucket_FS
let cm_bucket_FS
let annal_bucket_FS
let video_bucket_FS
let exercice_bucket_FS
let planchage_bucket_FS
let con = mongoose.connection.once('open',() => {
  const db = con.db;
  const td_bucket = new GridFSBucket(db,{ bucketName: 'td_bucket.fs.files' });
  td_bucket_FS = { td_bucket };
  const cm_bucket = new GridFSBucket(db,{ bucketName: 'cm_bucket.fs.files' });
  cm_bucket_FS = { cm_bucket };
  const annal_bucket = new GridFSBucket(db,{ bucketName: 'annal_bucket.fs.files' });
  annal_bucket_FS = { annal_bucket };

  const video_bucket = new GridFSBucket(db,{ bucketName: 'video_bucket.fs.files' });
  video_bucket_FS = { video_bucket };
  const  exercice_bucket = new GridFSBucket(db,{ bucketName: 'exercice_bucket.fs.files' });
  exercice_bucket_FS = { exercice_bucket };
  const planchage_bucket = new GridFSBucket(db,{ bucketName: 'planchage_bucket.fs.files' });
  planchage_bucket_FS = { planchage_bucket };
})

const downLoadFile = router.get('/file/download',authenticate, (req, res) => {
  let filename = req.query.filename;
  let contentType = req.query.contentType
console.log(filename)
console.log(contentType)
  switch(contentType) {

    case 'td':
      td_file_storage.db.collection('td_bucket.fs').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
        if(file == undefined || file == null) {
          return res.status(404).send("File not found")
        } else {
          const fileToSend = td_bucket_FS.bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
          res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
          res.set('Content-Type', 'application/octet-stream');
          res.set('Content',fileToSend)
          res.attachment(filename)
          fileToSend.pipe(res)
        }
      })

      break;
      case 'cm':
        cm_file_storage.db.collection('cm_bucket.fs').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
          if(file == undefined || file == null) {
            return res.status(404).send("File not found")
          } else {
            const fileToSend = cm_bucket_FS.bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
            res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content',fileToSend)
            res.attachment(filename)
            fileToSend.pipe(res)
          }
        })
        break;
        case 'annal':
          annal_file_storage.db.collection('annal_bucket.fs').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
            if(file == undefined || file == null) {
              return res.status(404).send("File not found")
            } else {
              const fileToSend = annal_bucket_FS.bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
              res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
              res.set('Content-Type', 'application/octet-stream');
              res.set('Content',fileToSend)
              res.attachment(filename)
              fileToSend.pipe(res)
            }
          })
          break;
          case 'video':
            video_file_storage.db.collection('video_bucket.fs').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
              if(file == undefined || file == null) {
                return res.status(404).send("File not found")
              } else {
                const fileToSend = video_bucket_FS.bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
                res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
                res.set('Content-Type', 'application/octet-stream');
                res.set('Content',fileToSend)
                res.attachment(filename)
                fileToSend.pipe(res)
              }
            })
            break;
            case 'excercices':
              exercice_file_storage.db.collection('exercice_bucket.fs').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
                if(file == undefined || file == null) {
                  return res.status(404).send("File not found")
                } else {
                  const fileToSend = exercice_bucket_FS.bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
                  res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
                  res.set('Content-Type', 'application/octet-stream');
                  res.set('Content',fileToSend)
                  res.attachment(filename)
                  fileToSend.pipe(res)
                }
              })
              break;
              case 'planchage':

                planchage_file_storage.db.collection('planchage_bucket.fs').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
                  if(file == undefined || file == null) {
                    return res.status(404).send("File not found")
                  } else {
                    const fileToSend = planchage_bucket_FS.bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
                    res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
                    res.set('Content-Type', 'application/octet-stream');
                    res.set('Content',fileToSend)
                    res.attachment(filename)
                    fileToSend.pipe(res)
                  }
                })
                break;
  }
});

const saveFile = router.post("/file/save", async function (req, res, next) {
  // let cour_name = req.query.cour_name;
  let contentType = req.headers.content_type
  let courName = req.headers.cour_name
  console.log(contentType)
  console.log(courName)
  req.additionalData = {
    courName: courName,
    // Add more additional data fields as needed
  };
  switch(contentType) {
    case 'td':
      await new Promise((reject,resolve) =>{
        upload_td_file(req, res, async function (err) {

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
      break;
      case 'cm':
        await new Promise((reject,resolve) =>{
          upload_cm_file(req, res, async function (err) {
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
        break;
        case 'annales':
          await new Promise((reject,resolve) =>{
            upload_annal_file(req, res, async function (err) {
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
          break;
          case 'video':
            await new Promise((reject,resolve) =>{
              upload_video_file(req, res, async function (err) {
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
            break;
            case 'excercices':
              await new Promise((reject,resolve) =>{
                upload_exercice_file(req, res, async function (err) {
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
              break;
              case 'planchage':
                await new Promise((reject,resolve) =>{
                  upload_planchage_file(req, res, async function (err) {
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
                break;
  }
})


const getFiles = router.get("/file", async function (req, res, next) {
  let cour_name = req.query.cour_name;
  let contentType = req.query.content_type
  // let filename = req.query.file_name
  let files_list = []
  switch(contentType) {
    case 'td':
      td_file_storage.db.collection('td_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
        files_list.push({name:file.filename,chapter:file.chapter})
      }).then((result) => {
        return res.status(200).send(files_list)
      }).catch((e) =>{
        return res.status(404).send(e)
      })
      break;
      case 'cm':
        cm_file_storage.db.collection('cm_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
          files_list.push({name:file.filename,chapter:file.chapter})
        }).then((result) => {
          return res.status(200).send(files_list)
        })
        break;
        case 'annales':
          annal_file_storage.db.collection('annal_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
            files_list.push({name:file.filename,chapter:file.chapter})

          }).then((result) => {
            return res.status(200).send(files_list)
          })
          break;
          case 'video':
            if(video_file_storage.db.collection('video_bucket.fs.files') == null) {

            }
            video_file_storage.db.collection('video_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
              files_list.push({name:file.filename,chapter:file.chapter})

            }).then((result) => {
              return res.status(200).send(files_list)
            })
            break;
            case 'excercices':
              exercice_file_storage.db.collection('exercice_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
                files_list.push({name:file.filename,chapter:file.chapter})

              }).then((result) => {
                return res.status(200).send(files_list)
              })
              break;
              case 'planchage':
                planchage_file_storage.db.collection('planchage_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
                  files_list.push({name:file.filename,chapter:file.chapter})
                }).then((result) => {
                  return res.status(200).send(files_list)
                })
                break;
  }
})

module.exports = router;
