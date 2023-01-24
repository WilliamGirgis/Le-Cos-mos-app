const express = require("express");
const router = express.Router();
const Group = require("./chat.group.model");
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


router.get("/discussion",authenticate, async function (req, res, next) {

  //let name = req.body.name
  var groupName = req.query.groupName
  let groupList = []


 await Group.find({id:{$regex: groupName, $options: "i" }}).then((group) => {
 return res.send(group).status(200)
 })

})


router.post("/discussion/modify",authenticate, async function (req, res, next) {
let newName = req.body.newName
let oldName = req.body.oldName
console.log("New name : " + newName)
console.log("Old name : " + oldName)
if(oldName === newName) {
  return
}
Group.findOneAndUpdate({name:oldName},{ $set: {name:newName}}).then((data) => {

return res.status(200).send()
})

})

router.post("/discussion/del",authenticate, async function (req, res, next) {
  let name = req.body.groupName
  console.log(name)

  Group.findOneAndDelete({name:name}).then((data) => {})

  return res.status(200).send()
  })




  router.post("/create",authenticate, async function (req, res, next) {

    let body = req.body;
    let name = body.name

    console.log("Name = " + name)
    name = 'HEY9'

    let newDiscussion = new Group({name:name})

    const response = await newDiscussion.save();
    return res.status(200).send()


    });



    const setUserInConversation = router.post("/user/add",/*authenticate,*/ function (req, res, next) {

      let groupName = req.body.name
      let userList = req.body.userList
console.log(userList)

for(let i = 0;i < userList.length;i++) {
  Group.updateOne({name:groupName},{$push:{user_list:userList[i]}}).then((group) => {

  })
}
return res.status(200).send()
   })


   const delUserFromConversation = router.post("/user/del",/*authenticate,*/ function (req, res, next) {

    let user = req.body.user
    let groupName = req.body.groupName
    // console.log(user._id)
    Group.updateOne({name:groupName},{ $pull: {user_list: {_id: { $in: [ user._id] }}}}).then(() => {

      return res.status(200).send()
    })



   })










module.exports = router;
