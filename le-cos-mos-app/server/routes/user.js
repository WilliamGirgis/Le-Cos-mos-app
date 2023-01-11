const express = require("express");
const router = express.Router();



const User = require("./user.model");


/* MIDLLEWARE */
const saveLog = (req, res, next) => {}



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
        console.log("session still valid")
        next();
      } else {
        console.log("session not valid anymore")
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

router.post("/users", (req, res) => {
  let body = req.body;
  let newUser = new User(body);
  newUser
    .save()
    .then(() => {
      return newUser.createSessions();
    })
    .then((refreshToken) => {
      return newUser.generateAccessToken().then((accessToken) => {
        return { accessToken, refreshToken };
      });
    })
    /*.then((authToken) => {
      /* Created diretory with the '_id'
      fs.mkdir(path.join(folder, newUser._id.toString()), (err) => {
        if (err) {
          return console.error(err);
        }
      });
      res
        .header("x-refresh-token", authToken.refreshToken)
        .header("x-access-token", authToken.accessToken)
        .send(newUser);
    })*/
    .catch((e) => {
      console.log(e)
      res.status(400).send(e);
    });
});

router.post("/users/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findByCredentials(email, password).then((user) => {
    if(!user) {
      return res.status(400).send();
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
  User.find({ id: { $regex: regex, $options: "i" } })
    .then((users2) => {
      users2.forEach((user) => {
        if(user.id !== 'Admin') {
          users.push({userType:user.userType,firstname:user.firstname,lastname:user.lastname,email:user.email,_id:user._id});
        }
      });
      return res.send(users);
    })
    .catch((e) => {
      return res.send(e);
    });
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

  console.log(email)
  User.findOneAndDelete({ email: email })
    .then((user) => {
      /*fs.rmdir(folder + "/" + user._id, { recursive: true }, (err, suc) => {
        console.log(user._id);
        if (err) {
          console.log("ERROR");
        } else {
          console.log("Folder deleted successfuly");
        }
      });*/
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
});

router.post("/users/modify",authenticate, (req, res) => {

  let newUser = req.body;
  let id = req.body._id;
  User.findOne({ id }).then((user) => {
    console.log("USER FOUND : " + user)

    User.updateOne(
      { _id: id },
      { $set: {userType:newUser.userType,email:newUser.email,firstname:newUser.firstname,lastname:newUser.lastname } }
    ).then((user) => {
    });
    return res.status(200).send(user._id.toString());
  }).catch((e) => {

    return res.send("ERROR")
  });
  /*bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPsw, salt, (err, hash) => {
      newPsw = hash;
      User.updateOne(
        { id: oldId },
        { $set: { id: newId, password: newPsw } }
      ).then((user) => {
        res.send(user);
      });
    });
  });*/
});

module.exports = router;
