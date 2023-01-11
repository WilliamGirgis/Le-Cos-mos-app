const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const lod = require('lodash');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { defaults } = require('lodash');
const jwtScret = "363926530498868229847hzerjherjeerverjyu51780120711262069gegerherher26"
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://test:Samsam123@cluster0.pcin2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Connected successfuly')

})

// Definir la table User ici
const userSchema = new mongoose.Schema({

  userType :{
      type: String,
      required:true
  },
    email: {
        type:String,
        required:true,
        minLength: 1,
        trim:true,
        unique:true
    },
    firstname: {
      type:String,
      required:true,
    },
    lastname: {
      type:String,
      required:true,
    },

    password: {
            type:String,
            required:true,
            minLength:2

    },
    session: [{
            token: {
                type:String,
                required:true
            },
            expireAt: {
                type:Number,
                required:true
            }

        }]
})

// Definir la table Cour ici

// Definir la table Discipline ici

// Definir la table Conversation ici



userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    // Return the odcuments except the password and sessions

    return lod.omit(userObject, ['password','session'])
}

userSchema.methods.generateAccessToken = function() {
    const user = this;
    return new Promise((resolve,reject) => {
        jwt.sign({_id:user._id.toHexString()},jwtScret,{expiresIn:"30m"},(error,token) => {
            if(!error) {
                resolve(token);
            } else {
                reject(error + "Error while generating access token !!!");
            }
        })
        // Create the JSON web token
    })
}


userSchema.methods.generateRefreshAuthToken = function() {
 return new Promise((resolve,reject) => {
     crypto.randomBytes(64, (err,buf) => {
         if(!err) {
             let token = buf.toString('hex');
             return resolve(token);
         } else {
             return reject(err + "Error while generating refresh token !!!");
         }
     })
 })
}

userSchema.methods.createSessions = function() {
    let user = this;
    return user.generateRefreshAuthToken().then((refreshToken)=> {

        return saveSession(user,refreshToken);
    }).then((refreshToken)=> {
return refreshToken;
    }).catch((e) => {
        return Promise.reject(e)
    })
}
/* Module Methods (statics)*/


userSchema.statics.findByIdAndToken = function (id,token) {
    const user = this;
    return user.findOne({
        "_id":id,
        "session.token":token
    });
}

userSchema.statics.getJWTSecret = () => {
return jwtScret;
}

userSchema.statics.findByCredentials = function(email,password) {
    let User = this;
return User.findOne({email}).then((user) => {
  if(!user) return Promise.reject();
  return new Promise((resolve,reject)=> {
      bcrypt.compare(password,user.password,(err,res) => {
          if(res) {
              resolve(user);
            }
          else {
              reject(err + " USER NOT FOUND USING CREDENTIALS");
          }
      })
  })
}).catch((e) => {
    console.log(e)
})
}
userSchema.statics.hasRefreshTokenExpired = (expireAt) => {
    let seconds = Date.now() /1000;
    if(expireAt > seconds) {
        return false;
    } else {
        return true;
    }
}


/* Middleware */
userSchema.pre('save', function(next) {
    let user = this;
    let costFactor = 10;
    if(user.isModified('password')) {
   bcrypt.genSalt(costFactor, (err,salt) => {
       bcrypt.hash(user.password,salt,(err,hash) => {
           user.password = hash;
           next();
       })
   })
    } else {
        next();
    }
})

/* Helper methods */

let saveSession = (user,refreshToken) => {
  return new Promise((resolve,reject) =>{
      let expireAt = generateRefreshTokenExpiryTime();
      user.session.push({"token":refreshToken,expireAt});
      user.save().then(() => {
          return resolve(refreshToken);
      }).catch((e) => {
          reject(e + " Error while saving sessions !!! ");
      })

    })
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpired = "10";
    let secondsUntilExpire = daysUntilExpired * 24 * 60 * 60; // 10 hours before the user must reconnect to generate a new refresh token
    return ((Date.now()/1000) + secondsUntilExpire);
}



const User = mongoose.model('User',userSchema);
module.exports = User
