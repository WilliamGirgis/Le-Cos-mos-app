const express = require("express");
const router = express.Router();
const Planning = require("./planning.model");
const User = require("./user.model");



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

router.post("/group/modify",authenticate, async function (req, res, next) {
  let newName = req.body.newName
  let oldName = req.body.oldName
  console.log("New name : " + newName)
  console.log("Old name : " + oldName)
  if(oldName === newName) {
    return
  }
  Planning.findOneAndUpdate({name:oldName},{ $set: {name:newName}}).then((data) => {})
  })


router.get("/get",authenticate, async function (req, res, next) {

  //let name = req.body.name
  var groupName = req.query.groupName
  let groupList = []


 await Planning.find({id:{$regex: groupName, $options: "i" }}).then((group) => {
groupList = group
 })
 return res.send(groupList).status(200)

})


router.post("/group/create",authenticate, async function (req, res, next) {

  let body = req.body;
  let name = body.groupName

  console.log("Name = " + name)
  name = 'HEY9'

  let newDiscussion = new Planning({name:name})

  const response = await newDiscussion.save();
  res.status(200).send()


  });

  const delUserFromGroup= router.post("/user/del",/*authenticate,*/ function (req, res, next) {
    let user = req.body.user
    let groupName = req.body.groupName
    // console.log(user._id)
    Planning.updateOne({name:groupName},{ $pull: {user_list: {_id: { $in: [ user._id] }}}}).then(() => {

      return res.status(200).send()
    })
   })

   router.post("/group/del",authenticate, async function (req, res, next) {
    let name = req.body.groupName
    console.log(name)

    Planning.findOneAndDelete({name:name}).then((data) => {})

    return res.status(200).send()
    })


    const setUserInGroup = router.post("/user/add",/*authenticate,*/ function (req, res, next) {

      let groupName = req.body.name
      let userList = req.body.userList
console.log(userList)

for(let i = 0;i < userList.length;i++) {
  Planning.updateOne({name:groupName},{$push:{user_list:userList[i]}}).then((group) => {

  })
}
return res.status(200).send()
   })





module.exports = router;
