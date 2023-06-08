const express = require("express");
const router = express.Router();



const User = require("./user.model");
const Planning = require("./planning.model")

/* MIDLLEWARE */



const verify = (req, res, next) => {
  let refreshToken = req.header("x-refresh-token");//
  let _id = req.header("_id");
  User.findByIdAndToken(_id, refreshToken)
    .then((user) => {
      if (!user) {
        return Promise.reject({
          error: "USER NOT FOUND with :" + refreshToken + " \n " + _id,
        });
      }

      // If this code is reach, the user was found therefor the session is valid

      req.userObject = user;
      req.refreshToken = refreshToken;

      let isSessionValid = false;
      user.session.forEach((session) => {
        if (User.hasRefreshTokenExpired(session.expireAt) === false) {
          isSessionValid = true;
        }
      });

      if (isSessionValid) {
        next();
      } else {
        return Promise.reject({
          error: "The session token has expired or is invalid",
        });
      }
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};

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

/* MIDDLEWARE-END */

router.post("/users", async (req, res) => {
  let body = req.body;
  let newUser = new User(body);
  await newUser
    .save()
    .then(async () => {
      if(body.userType == "Etudiant") {
        let user = {firstname:body.firstname,lastname:body.lastname,role:body.userType,email:body.email}

        await Planning.updateOne({groupName:'Tronc Commun Class A'},{$push:{user_list:user}}).then((group) => {

        })
      }

      return newUser.createSessions();
    })
    .then((refreshToken) => {
      return newUser.generateAccessToken().then((accessToken) => {
        return { accessToken, refreshToken };
      });
    })
    .catch((e) => {
      return res.status(400).send(e);
    });
});

router.post("/users/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findByCredentials(email, password).then((user) => {
    if(!user) {
      return res.status(404).send("noUser");
    }
    return user
      .createSessions()
      .then((refreshToken) => {
        return user.generateAccessToken().then((accessToken) => {
          return { accessToken, refreshToken };
        });
      })
      .then((authToken) => {
        res
          .header("x-refresh-token", authToken.refreshToken)
          .header("x-access-token", authToken.accessToken)
          .send(user);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  });
});

router.get("/users/me/access-Token", verify, (req, res) => {

  req.userObject
    .generateAccessToken()
    .then((accessToken) => {
      res.header("x-access-token", accessToken).send({ accessToken });
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/users/id",authenticate, (req, res) => {
  let regex = req.query.id;
  let users = [];
  if(regex == "" || regex == " ") {
    User.find({$regex:regex,$options:"i"})
    .then((users2) => {

      users2.forEach((user) => {

          users.push({userType:user.userType,firstname:user.firstname,lastname:user.lastname,email:user.email,_id:user._id,planningNameGroupBelonging:user.planningNameGroupBelonging,groupsNameDiscussionBelonging:user.groupsNameDiscussionBelonging});


      });
      return res.status(200).send(users);
    }).catch((e) => {

      return res.send(e);
    });

  } else {
    User.find({$or:[{lastname: {$regex:regex,$options:"i"}},{firstname:{$regex:regex,$options:"i"}},{email:{$regex:regex,$options:"i"}},{userType:{$regex:regex,$options:"i"}}]})
    .then((users2) => {
      users2.forEach((user) => {
        if(user.id !== 'Admin') {
          users.push({userType:user.userType,firstname:user.firstname,lastname:user.lastname,email:user.email,_id:user._id});
        }
      });
      return res.status(200).send(users);
    })
    .catch((e) => {
      return res.send(e);
    });
  }

});

router.get("/users/_id",authenticate, (req, res) => {
  let id = req.query.id;
  User.findOne({ id }).then((user) => {
    return res.send(user._id.toString());
  }).catch((e) => {

    return res.send("ERROR")
  });

});

router.get("/users/del",authenticate, (req, res) => {
  let email = req.query.email;
  User.findOneAndDelete({ email: email })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.post("/users/modify",authenticate, (req, res) => {
  let newUser = req.body;
  let id = req.body._id;
    User.findOneAndUpdate(
      { _id: id },
      { $set: {userType:newUser.userType,email:newUser.email,firstname:newUser.firstname,lastname:newUser.lastname } }
    ).then((user) => {
      return res.status(200).send();
    });
});

// Get specific user
router.get("/user/get",authenticate, (req, res) => {
  let id = req.query.id;

    User.findOne({ _id: id }).then((user) => {
      return res.status(200).send(user);
    });
});



const { GridFSBucket } = require('mongodb');
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = "mongodb+srv://test:Samsam123@cluster0.pcin2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const co = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
})

// Files buckets initialisation
let profil_bucket_FS
let dbg
let con = mongoose.connection.once('open', () => {
  const db = con.db;
  dbg = db
  const profil_bucket = new GridFSBucket(db, { bucketName: 'profil_bucket.fs' });
  profil_bucket_FS = { profil_bucket };
})

const profil_file_storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return {
      filename: file.originalname.replace(/â/, '\'').normalize("NFD").replace(/[\u0300-\u036f]|[\x80-\x99]/g, ""),
      bucketName: 'profil_bucket.fs',
      metadata: {
        'type': 'Profil picture',
      }
    }
  }
});
const upload_profil_file = multer({ storage: profil_file_storage }).single("file");



router.post("/user/profil/file/save", (req, res) => {

  let _id = req.headers._id
console.log(_id)
  req.additionalData = {
    _id: _id,
    // Add more additional data fields as needed
  };
  profil_file_storage.db.collection('profil_bucket.fs.files').findOneAndDelete({ filename: _id }).then((result) => {
    const deletedFileId = result.value._id
    const bucket = new GridFSBucket(dbg, { bucketName: 'profil_bucket.fs' });
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
  }).catch((e) => {
    return res.status(200).send(e)
  })

  upload_profil_file(req, res, async function (err) {

    if (err) {

    } else {

    }
  })
});

router.get("/user/profil/file/get",authenticate, (req, res) => {
  let _id = req.query._id
  profil_file_storage.db.collection('profil_bucket.fs.files').findOne({ filename: _id }).then((file) => {
    if (file == undefined || file == null) {

      return res.status(404).send("File not found")
    } else {
      const fileToSend = profil_bucket_FS.profil_bucket.openDownloadStreamByName(_id);
      res.set('Content-Disposition', `attachment; filename="${_id}"`);
      res.set('Content-Type', 'application/octet-stream');
      res.set('Content', fileToSend)
      res.attachment(_id)
      fileToSend.pipe(res)
    }
  })

})


const bcrypt = require("bcryptjs");
router.post("/user/profil/psw/modify",authenticate, (req, res) => {
  let id = req.body._id
let newPsw = req.body.newPsw
console.log(id)
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(newPsw, salt, (err, hash) => {
    newPsw = hash;
    User.updateOne(
      { _id: id },
      { $set: { password: newPsw } }
    ).then((user) => {
      return  res.status(200).send(user);
    });
  });
});

})



router.get("/admin/check", (req, res) => {
let user_id = req.query._id
User.findOne({_id:user_id}).then((user) =>{
  if(user.userType.toLowerCase() == 'admin') {
return res.status(200).send("OK")
  } else {
    return res.status(404).send("NO")
  }
})
})
router.get("/etudiant/check", (req, res) => {
  let user_id = req.query._id

  User.findOne({_id:user_id}).then((user) =>{
    console.log(user)
    if(user.userType.toLowerCase() == 'etudiant') {
  return res.status(200).send("OK")
    } else {
      return res.status(404).send("NO")
    }
  }).catch((e) =>{
    console.log(e)
  })
  })

  router.get("/enseignant/check", (req, res) => {
    let user_id = req.query._id
    console.log(user_id)
    User.findOne({_id:user_id}).then((user) =>{
      if(user.userType.toLowerCase() == 'enseignant') {
    return res.status(200).send("OK")
      } else {
        return res.status(404).send("NO")
      }
    })
    })


module.exports = router;

