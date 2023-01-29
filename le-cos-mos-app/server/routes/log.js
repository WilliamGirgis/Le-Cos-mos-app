const express = require("express");
const router = express.Router();



const Log = require("./log.model");
const User = require("./user.model");

router.post("/save",  (req, res) => {
  let body = req.body;
  let user_Id = body._id
  if(user_Id == undefined || null) {
    return
  }
  let firstname = ''
  let lastname = ''
  const DateNow = Date.now();
  let dateObj =  new Date(DateNow)
  let mois = dateObj.getUTCMonth() + 1
  mois = mois.toString()
  let jour = dateObj.getUTCDate().toString()
  let anne = dateObj.getFullYear().toString()
  let hour =  +dateObj.getHours() < 10 ? '0' + +dateObj.getHours() : dateObj.getHours()
  let minute = +dateObj.getMinutes() < 10 ? '0' + +dateObj.getMinutes() : dateObj.getMinutes()
  let modifyHour = hour + ":" + minute
  let modifyMonth = +mois < 10 ? '0'+mois : mois // si moins que 10, alors on affiche avec le 0 dèrrière. le "+" permet de covertir en nombre
  let date  = jour+ "/" + modifyMonth + "/" + anne + " à " + modifyHour
  let action = body.action
  User.findOne({ _id: user_Id }).then(async (user) =>{
    console.log(user)

    if(user.matchedCount == 0) {
      return
    }
    firstname = user.firstname
    lastname = user.lastname


 let log = {UserID:user_Id,firstname:firstname,lastname:lastname,date:date,action:action}
 let newLog = new Log(log);
return newLog
   .save().then(() => {})
  });


});



router.get("/logs",  (req, res) => {
  let regex = req.query.id;
  let logs = [];
  Log.find({ id: { $regex: regex, $options: "i" } }) // Laisser le 'id'
    .then((logArray) => {
      logArray.forEach((log) => {
          logs.push({firstname:log.firstname,lastname:log.lastname,date:log.date,action:log.action});

      });
      return res.send(logs);
    })
    .catch((e) => {
      return res.send(e);
    });


})

module.exports = router;
