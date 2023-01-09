const express = require("express");
const router = express.Router();
const multer = require("multer");
const folder = "src/assets/images/uploaded";
const jwt = require('jsonwebtoken');
module.exports = router;
const path = require("path");
const fs = require("fs");
const User = require("./user.model");
const Blob = require('node:buffer').Blob
//const readJsonFile = require("jsonfile");
const publicationFolder =
  "src/assets/images/uploaded/";
let authenticate = (req,res,next) => {
  let token = req.header('x-access-token')


  jwt.verify(token,User.getJWTSecret(),(err,decoded)=>{

   if(err) {
     // Do not Authenticate
     res.status(401).send(err)
   } else {
     req.user_id = decoded._id

     next()
   }
  })
}

const getImages = router.get("/images",authenticate, function (req, res, next) {
    // API used in adminview.component.ts
    const filename = req.query.imageName; // The localstorage _id given by client-files.component

    fs.readdir(folder, (err, filesName) => {
      if (filesName === undefined) {
        return res.send("No Files");
      }
      console.log("Files name are = " + filesName)
      const allFiles = []; // This variable should stay here in order to be deleted after each request performed, (otherwise we accumlate the files in json)
      filesName.forEach((filename) => {
       // const fileBlob = reader.()
        allFiles.push(filename);
      });


    return res.sendFile("src/assets/images/uploaded/" + filename,
    { root: "C:/Users/William/Desktop/Le Cosm'os app/Le-Cos-mos-app/Le-Cos-mos-app/le-cos-mos-app" },
    function (err) {
      if (err) {
        next(err);
      } else {
        console.log("Sent:", publicationFolder);
      }
    }
  );
});
    });



    //Storing on disk realted API - MiddleWare
    var store = multer.diskStorage({
        destination: function (req, file, cb) {
          //const id = req.params.id;// (_id) given by localstorage
          cb(null, folder);
        },
        filename: function (req, file, cb) {
          console.log(file)
          var today = new Date();
          cb(
            null,
            /*today.getDate() +
              "-" +
              (today.getUTCMonth() + 1) +
              "-" +
              today.getFullYear() +
              "." +*/
              file.originalname
          );
        },
      });


      var upload = multer({ storage: store }).single("file");
      router.post("/upload", function (req, res, next) { // include "authenticate" middleware, but jwt provided
        upload(req, res, function (err) {
          if (err) {

            return res.status(501).json({ error: err });
          }
          return res.json({
            originalname: req.file.originalname,
            upload: req.file.filename,
          });
        });
      });


      const delFiles = router.post("/dir/del/:_id/:file",authenticate, function (req, res) {
        let _id = req.params._id;
        let file = req.params.file;

        if (file.indexOf(" ") === 0) {
          // In case a file name has a space at the begginin

          file = file.replace(/ /, "");
        }

        console.log("FILE DELETED: " + "id =" + _id + " file =" + file);
        fs.unlink(folder + "/" + _id + "/" + file, (err) => {
          if (err) {
            console.log(err);
            return res.send(err);
          }
          return res.send().status(200);
        });
      });

      const downFile = router.get(
        "/download/:folderID/:file",authenticate,
        function (req, res, next) {
          let folderID = req.params.folderID;
          let file = req.params.file;
          filepath = path.join(folder, folderID, file);
          return res.sendFile(
            filepath,
            { root: "C:/Users/Samwil/Desktop/Stage_Train/pre-stage" },
            function (err) {
              if (err) {
                next(err);
              } else {
                console.log("Sent:", filepath);
              }
            }
          );
        }
      );
