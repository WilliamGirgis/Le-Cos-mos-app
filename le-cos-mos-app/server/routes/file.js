const express = require("express");
const router = express.Router();
const multer = require("multer");
const folder = "src/app/user_Views/admin_views/home_view/publications/images";
module.exports = router;
const path = require("path");
const fs = require("fs");

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

const getFiles = router.get("/dir/:_id",authenticate, function (req, res, next) {
    // API used in adminview.component.ts
    const id = req.params.id; // The localstorage _id given by client-files.component
    fs.readdir(folder + "/" + id, (err, files) => {
      if (files === undefined) {
        return res.send("No Files");
      }
      const allFiles = []; // This variable should stay here in order to be deleted after each request performed, (otherwise we accumlate the files in json)
      files.forEach((file) => {
        allFiles.push(file);
      });
      return res.send(allFiles);
    });
  });


    //Storing on disk realted API - MiddleWare
    var store = multer.diskStorage({
        destination: function (req, file, cb) {
          //const id = req.params.id;// (_id) given by localstorage
          cb(null, folder);
        },
        filename: function (req, file, cb) {
          var today = new Date();
          cb(
            null,
            today.getDate() +
              "-" +
              (today.getUTCMonth() + 1) +
              "-" +
              today.getFullYear() +
              "." +
              file.originalname
          );
        },
      });


      var upload = multer({ storage: store }).single("file");
      router.post("/upload", function (req, res, next) { // include "authenticate" middleware, but jwt provided
        //('/upload/:id',function(req,res,next)
        console.log(req.files)
        upload(req, res, function (err) {
          if (err) {
            console.log(err)
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
