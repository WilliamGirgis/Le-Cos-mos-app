const express = require("express");
const router = express.Router();
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


const { GridFSBucket } = require('mongodb');
const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');

// Files buckets initialisation
let td_bucket_FS
let cm_bucket_FS
let annal_bucket_FS
let video_bucket_FS
let exercice_bucket_FS
let planchage_bucket_FS
let dbg
let con = mongoose.connection.once('open',() => {
  const db = con.db;
  dbg = db
  const td_bucket = new GridFSBucket(db,{ bucketName: 'td_bucket.fs' });
  td_bucket_FS = { td_bucket };
  const cm_bucket = new GridFSBucket(db,{ bucketName: 'cm_bucket.fs' });
  cm_bucket_FS = { cm_bucket };
  const annal_bucket = new GridFSBucket(db,{ bucketName: 'annal_bucket.fs' });
  annal_bucket_FS = { annal_bucket };

  const video_bucket = new GridFSBucket(db,{ bucketName: 'video_bucket.fs' });
  video_bucket_FS = { video_bucket };
  const  exercice_bucket = new GridFSBucket(db,{ bucketName: 'exercice_bucket.fs' });
  exercice_bucket_FS = { exercice_bucket };
  const planchage_bucket = new GridFSBucket(db,{ bucketName: 'planchage_bucket.fs' });
  planchage_bucket_FS = { planchage_bucket };
})

//
const td_file_storage = new GridFsStorage({ url:url,
  file: (req, file) => {
       return {
         filename: file.originalname.replace(/â/,'\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, ""),
         bucketName:'td_bucket.fs',
         metadata:{
          'type':'Travaux dirigés',
          'courName':req.additionalData.courName,
          'chapter':req.additionalData.chapter
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
          'courName':req.additionalData.courName,
          'chapter':req.additionalData.chapter
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
          'courName':req.additionalData.courName,
          'chapter':req.additionalData.chapter
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
          'courName':req.additionalData.courName,
          'chapter':req.additionalData.chapter
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
          'courName':req.additionalData.courName,
          'chapter':req.additionalData.chapter
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
          'courName':req.additionalData.courName,
          'chapter':req.additionalData.chapter
         }
       }
}  });
const upload_planchage_file = multer({ storage:planchage_file_storage }).array("file");


// End File related



const downLoadFile = router.get('/file/download',authenticate, (req, res) => {
  let filename = req.query.filename;
  let contentType = req.query.contentType


  switch(contentType) {

    case 'td':
      td_file_storage.db.collection('td_bucket.fs.files').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
        if(file == undefined || file == null) {
          return res.status(404).send("File not found")
        } else {
          const fileToSend = td_bucket_FS.td_bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
          res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
          res.set('Content-Type', 'application/octet-stream');
          res.set('Content',fileToSend)
          res.attachment(filename)
          fileToSend.pipe(res)
        }
      })

      break;
      case 'cm':
        cm_file_storage.db.collection('cm_bucket.fs.files').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
          if(file == undefined || file == null) {
            return res.status(404).send("File not found")
          } else {
            const fileToSend = cm_bucket_FS.cm_bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
            res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
            res.set('Content-Type', 'application/octet-stream');
            res.set('Content',fileToSend)
            res.attachment(filename)
            fileToSend.pipe(res)
          }
        })
        break;
        case 'annal':
          annal_file_storage.db.collection('annal_bucket.fs.files').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
            if(file == undefined || file == null) {
              return res.status(404).send("File not found")
            } else {
              const fileToSend = annal_bucket_FS.annal_bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
              res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
              res.set('Content-Type', 'application/octet-stream');
              res.set('Content',fileToSend)
              res.attachment(filename)
              fileToSend.pipe(res)
            }
          })
          break;
          case 'video':
            video_file_storage.db.collection('video_bucket.fs.files').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
              if(file == undefined || file == null) {
                console.log("File not found")
                return res.status(404).send("File not found")
              } else {
                const fileToSend = video_bucket_FS.video_bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
                res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
                res.set('Content-Type', 'application/octet-stream');
                res.set('Content',fileToSend)
                res.attachment(filename)
                fileToSend.pipe(res)
              }
            })
            break;
            case 'excercices':
              exercice_file_storage.db.collection('exercice_bucket.fs.files').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
                if(file == undefined || file == null) {
                  return res.status(404).send("File not found")
                } else {
                  const fileToSend = exercice_bucket_FS.exercice_bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
                  res.set('Content-Disposition', `attachment; filename="${filename.replace(/\’/,'\'')}"`);
                  res.set('Content-Type', 'application/octet-stream');
                  res.set('Content',fileToSend)
                  res.attachment(filename)
                  fileToSend.pipe(res)
                }
              })
              break;
              case 'planchage':

                planchage_file_storage.db.collection('planchage_bucket.fs.files').findOne({filename:filename.replace(/\’/,'\'')}).then((file) => {
                  if(file == undefined || file == null) {
                    return res.status(404).send("File not found")
                  } else {
                    const fileToSend = planchage_bucket_FS.planchage_bucket.openDownloadStreamByName(filename.replace(/\’/,'\''));
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
  let chapter = req.headers.chapter
  req.additionalData = {
    courName: courName,
    chapter:chapter
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
const delFile = router.post("/file/del", async function (req, res, next) {
  let courName = req.body.courName;
  let contentType = req.body.contentType
  let documentName = req.body.documentName
console.log(courName)
console.log(contentType)
console.log(documentName)
  switch(contentType) {
    case 'td':
      if(td_file_storage.db.collection('td_bucket.fs.files') == null) {
        return res.status(404).send()
      }
      td_file_storage.db.collection('td_bucket.fs.files').findOneAndDelete({filename:documentName},{'metadata.courName':courName}).then((result) => {
        const deletedFileId = result.value._id
        console.log(result)
        const bucket = new GridFSBucket(dbg, { bucketName: 'tq_bucket.fs' });
        bucket.delete(deletedFileId).then((res) => {
            // File successfully deleted from the GridFS bucket
            return res.status(200).send();
        }).catch((e) => {
          if (e) {

            // To make sure the client request getFiles() again.
            // "File not found for id 646a849c5aea81a3d4a74519" Was triggered, even though the chuks were all deleted
            return res.status(200).send();
          }
        });
        return res.status(200).send()
      }).catch((e) =>{
        console.log(e)
        return res.status(404).send(e)
      })
      break;
      case 'cm':
        if(cm_file_storage.db.collection('cm_bucket.fs.files') == null) {
          return res.status(404).send()
        }
        cm_file_storage.db.collection('cm_bucket.fs.files').findOneAndDelete({filename:documentName},{'metadata.courName':courName}).then((result) => {
          const deletedFileId = result.value._id
          console.log(result)
          const bucket = new GridFSBucket(dbg, { bucketName: 'cm_bucket.fs' });
          bucket.delete(deletedFileId).then((res) => {
              // File successfully deleted from the GridFS bucket
              return res.status(200).send();
          }).catch((e) => {
            if (e) {
              console.error(e);
              // To make sure the client request getFiles() again.
              // "File not found for id 646a849c5aea81a3d4a74519" Was triggered, even though the chuks were all deleted
              return res.status(200).send();
            }
          });
          return res.status(200).send()
        }).catch((e) =>{
          console.log(e)
          return res.status(404).send(e)
        })
        break;
        case 'annales':
          if(annal_file_storage.db.collection('annal_bucket.fs.files') == null) {
            return res.status(404).send()
          }
          annal_file_storage.db.collection('annal_bucket.fs.files').findOneAndDelete({filename:documentName},{'metadata.courName':courName}).then((result) => {
            const deletedFileId = result.value._id
            console.log(result)
            const bucket = new GridFSBucket(dbg, { bucketName: 'annal_bucket.fs' });
            bucket.delete(deletedFileId).then((res) => {
                // File successfully deleted from the GridFS bucket
                return res.status(200).send();
            }).catch((e) => {
              if (e) {
                console.error(e);
                // To make sure the client request getFiles() again.
                // "File not found for id 646a849c5aea81a3d4a74519" Was triggered, even though the chuks were all deleted
                return res.status(200).send();
              }
            });
            return res.status(200).send()
          }).catch((e) =>{
            console.log(e)
            return res.status(404).send(e)
          })
          break;
          case 'video':
            if(video_file_storage.db.collection('video_bucket.fs.files') == null) {
              return res.status(404).send()
            }
            video_file_storage.db.collection('video_bucket.fs.files').findOneAndDelete({filename:documentName},{'metadata.courName':courName}).then((result) => {
              const deletedFileId = result.value._id
              console.log(result)
              const bucket = new GridFSBucket(dbg, { bucketName: 'video_bucket.fs' });
              bucket.delete(deletedFileId).then((res) => {
                  // File successfully deleted from the GridFS bucket
                  return res.status(200).send();
              }).catch((e) => {
                if (e) {
                  console.error(e);
                  // To make sure the client request getFiles() again.
                  // "File not found for id 646a849c5aea81a3d4a74519" Was triggered, even though the chuks were all deleted
                  return res.status(200).send();
                }
              });
              return res.status(200).send()
            }).catch((e) =>{
              console.log(e)
              return res.status(404).send(e)
            })
          
            break;
            case 'excercices':
              if(exercice_file_storage.db.collection('exercice_bucket.fs.files') == null) {
                return res.status(404).send()
              }
              exercice_file_storage.db.collection('exercice_bucket.fs.files').findOneAndDelete({filename:documentName},{'metadata.courName':courName}).then((result) => {
                const deletedFileId = result.value._id
                console.log(result)
                const bucket = new GridFSBucket(dbg, { bucketName: 'exercice_bucket.fs' });
                bucket.delete(deletedFileId).then((res) => {
                    // File successfully deleted from the GridFS bucket
                    return res.status(200).send();
                }).catch((e) => {
                  if (e) {
                    console.error(e);
                    // To make sure the client request getFiles() again.
                    // "File not found for id 646a849c5aea81a3d4a74519" Was triggered, even though the chuks were all deleted
                    return res.status(200).send();
                  }
                });
                return res.status(200).send()
              }).catch((e) =>{
                console.log(e)
                return res.status(404).send(e)
              })
              break;
              case 'planchage':
                if(planchage_file_storage.db.collection('planchage_bucket.fs.files') == null) {
                  return res.status(404).send()
                }
                planchage_file_storage.db.collection('planchage_bucket.fs.files').findOneAndDelete({filename:documentName},{'metadata.courName':courName}).then((result) => {
                  const deletedFileId = result.value._id
                  console.log(result)
                  const bucket = new GridFSBucket(dbg, { bucketName: 'planchage_bucket.fs' });
                  bucket.delete(deletedFileId).then((res) => {
                      // File successfully deleted from the GridFS bucket
                      return res.status(200).send();
                  }).catch((e) => {
                    if (e) {
                      console.error(e);
                      // To make sure the client request getFiles() again.
                      // "File not found for id 646a849c5aea81a3d4a74519" Was triggered, even though the chuks were all deleted
                      return res.status(200).send();
                    }
                  });
    
                }).catch((e) =>{
                  console.log(e)
                  return res.status(404).send(e)
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
      if(td_file_storage.db.collection('td_bucket.fs.files') == null) {
        return res.status(404).send()
      }
      td_file_storage.db.collection('td_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
        if(file.metadata.courName == cour_name) {
          files_list.push({name:file.filename,chapter:file.metadata.chapter})
        }
      }).then((result) => {
        return res.status(200).send(files_list)
      }).catch((e) =>{
        return res.status(404).send(e)
      })
      break;
      case 'cm':
        if(cm_file_storage.db.collection('cm_bucket.fs.files') == null) {
          return res.status(404).send()
        }
        cm_file_storage.db.collection('cm_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
          if(file.metadata.courName == cour_name) {
            files_list.push({name:file.filename,chapter:file.metadata.chapter})
          }
        }).then((result) => {
          return res.status(200).send(files_list)
        })
        break;
        case 'annales':
          if(annal_file_storage.db.collection('annal_bucket.fs.files') == null) {
            return res.status(404).send()
          }
          annal_file_storage.db.collection('annal_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
            if(file.metadata.courName == cour_name) {
              files_list.push({name:file.filename,chapter:file.metadata.chapter})
            }

          }).then((result) => {
            return res.status(200).send(files_list)
          })
          break;
          case 'video':
            if(video_file_storage.db.collection('video_bucket.fs.files') == null) {
              return res.status(404).send()
            }
            video_file_storage.db.collection('video_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
              if(file.metadata.courName == cour_name) {
                files_list.push({name:file.filename,chapter:file.metadata.chapter})
              }

            }).then((result) => {
              return res.status(200).send(files_list)
            })
            break;
            case 'excercices':
              if(exercice_file_storage.db.collection('exercice_bucket.fs.files') == null) {
                return res.status(404).send()
              }
              exercice_file_storage.db.collection('exercice_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
                if(file.metadata.courName == cour_name) {
                  files_list.push({name:file.filename,chapter:file.metadata.chapter})
                }
              }).then((result) => {
                return res.status(200).send(files_list)
              })
              break;
              case 'planchage':
                if(planchage_file_storage.db.collection('planchage_bucket.fs.files') == null) {
                  return res.status(404).send()
                }
                planchage_file_storage.db.collection('planchage_bucket.fs.files').find({filename:{$regex:'',$options:"i"}}).forEach((file) => {
                  if(file.metadata.courName == cour_name) {
                    files_list.push({name:file.filename,chapter:file.metadata.chapter})
                  }
                }).then((result) => {
                  return res.status(200).send(files_list)
                })
                break;
  }
})

module.exports = router;
