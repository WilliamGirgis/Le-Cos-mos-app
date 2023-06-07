const express = require("express");
const router = express.Router();
const Planning = require("./planning.model");
const User = require("./user.model");
const jwt = require('jsonwebtoken');
const fs = require("fs");
let publicationFolder =
  "src/app/user_Views/admin-views/planning-view/group-planning/seances";

let authenticate = (req, res, next) => {  /* MIDDLEWARE for checking if the access-token has expired */
  let token = req.header('x-access-token') // We intercept each request, taking the access-Token of the current user logged in
  jwt.verify(token, User.getJWTSecret(), (err, decoded) => {// We decrypt the token, and if it the token is empty or not valid, the user get disconnected
    if (err) {
      // Do not Authenticate
      res.status(401).send(err)
    } else {
      req.user_id = decoded._id
      next()
    }
  })
}

router.post("/group/modify", authenticate, async function (req, res, next) {
  let newName = req.body.newName.replace(/ /g,'_')
  let oldName = req.body.oldName.replace(/ /g,'_')
  fs.renameSync(publicationFolder + '/' + oldName + '.json',publicationFolder + '/' + newName + '.json');

  let isTronCommun = false
  let splitedNewName = req.body.newName.split(/ /)
  let testTroncCommun = splitedNewName[0].toLowerCase() + ' ' + splitedNewName[1].toLowerCase()
  if (oldName === newName) {
    return
  } else if (testTroncCommun == 'tronc commun'.toLowerCase()) {
    isTronCommun = true
  }
  Planning.findOneAndUpdate({ groupName: oldName }, { $set: { groupName: newName, istronCommun: isTronCommun } }).then((data) => {
    return res.status(200).send()
  })
})

router.get("/get", authenticate, async function (req, res, next) {
  var groupName = req.query.groupName
  await Planning.find({ id: { $regex: groupName, $options: "i" } }).then((group) => {

    return res.status(200).send(group)
  })

})

router.post("/set", async function (req, res, next) {
  const planning = req.body.planning
  var owner = req.body.planningOwner
  var week = req.body.week
  let transformedarray = []
  for (let i = 0; i < planning.length; i++) { // Les 7 jours
    for (let j = 0; j < planning[i].length; j++) { // Les 12 creneaux dans chaque jour
      for(let x = 0; x < 4; x++) {
        if (planning[i][j][x][1] != '' && planning[i][j][x][2] != '') {
          transformedarray.push({ creneau: planning[i][j][x][0], matiere: planning[i][j][x][1], type: planning[i][j][x][2], day: planning[i][j][x][3], room: planning[i][j][x][4],duree: planning[i][j][x][5],quartDheure: planning[i][j][x][6] })
        }
      }
    }
  }

  await Planning.findOne({ groupName: owner }).then(async (group) => {
    if(group == null) {
console.log("The group doesn't exist")
let plan = new Planning({groupName:owner,istronCommun:false,type:'user',week:[{weekDate:week,seance:[]}],user_list:[]})
plan.save().then(async (resulting) =>{
  for (let i = 0; i < plan.week.length; i++) {
    // If the week already exists, we change it's seance list and then save the changes
    if (plan.week[i].weekDate == week) {

      for (let j = 0; j < transformedarray.length;j++) {
        plan.week[i].seance[j] = transformedarray[j] // La transformation de l'attribut 'creneau' en tableau se fait ici.

      }
      await plan.save().catch((e) =>{
        console.log(e)
      });
      console.log("DONE")
      return res.status(200).send("Seance Updated ! ")

    }
  }
})

    } else {
      for (let i = 0; i < group.week.length; i++) {
        // If the week already exists, we change it's seance list and then save the changes
        if (group.week[i].weekDate == week) {

          for (let j = 0; j < transformedarray.length;j++) {
            group.week[i].seance[j] = transformedarray[j] // La transformation de l'attribut 'creneau' en tableau se fait ici.

          }
          await group.save();
          return res.status(200).send("Seance Updated ! ")

        }
      }

      return res.status(404).send('week does not exist in DB')
    }

  })
})

const setUserInGroup = router.post("/user/add",/*authenticate,*/ async function (req, res, next) {
  let groupName = req.body.name
  let userList = req.body.userList
  for (let i = 0; i < userList.length; i++) {

    await User.updateOne({ _id: userList[i]._id }, { $push: { planningNameGroupBelonging: groupName } }).then((user) => {
    })

    await Planning.updateOne({ groupName: groupName }, { $push: { user_list: userList[i] } }).then((group) => {
    })

  }
  return res.status(200).send()
})

router.post("/group/create", authenticate, async function (req, res, next) {
  let body = req.body;
  let name = body.name.replace(/ /g,'_')
  let isTronCommun = false
  fs.writeFileSync(publicationFolder + '/' + name + '.json', '[]', async function (data) {
  })
  let newGroup = new Planning({ groupName: name, istronCommun: isTronCommun, type: 'Group' })
  const response = await newGroup.save();
  return res.status(200).send()
});

const delUserFromGroup = router.post("/user/del",/*authenticate,*/ function (req, res, next) {
  let user = req.body.user
  let groupName = req.body.groupName
  Planning.updateOne({ groupName: groupName }, { $pull: { user_list: { _id: { $in: [user._id] } } } }).then(() => {
    User.updateOne({ _id: user._id }, { $pull: { planningNameGroupBelonging: groupName } }).then((user) => {
      return res.status(200).send()
    })
  })
})

const getPlanning = router.get("/group/planning",/*authenticate,*/ async function (req, res, next) {
  let planningOwner = req.query.groupName
  let weekSelected = req.query.week
  await Planning.findOne({ groupName: planningOwner }).then(async (group) => {
    if(group == undefined) {
      return res.status(400).send(['NOT FOUND'])
    }
    for (let i = 0; i < group.week.length; i++) {
      if (group.week[i].weekDate == weekSelected) {
        return res.status(200).send(group.week[i])
      }
    }
       await group.updateOne({ $push: { week: { weekDate: weekSelected, seance: [] } } }).then(async (week) => {
        return res.status(200).send({weekDate:weekSelected,seance:[]})
      })

  })
})

router.post("/group/del", authenticate, async function (req, res, next) {
  let name = req.body.groupName
  fs.rmSync(publicationFolder + '/' + name + '.json', { recursive: true, force: true });
  Planning.findOneAndDelete({ groupName: name }).then((data) => {
    return res.status(200).send()
  })
})

module.exports = router;
