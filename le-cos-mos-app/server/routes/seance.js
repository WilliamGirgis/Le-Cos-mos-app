const express = require("express");
const router = express.Router();

module.exports = router;

let publicationFolder =
  "src/app/user_Views/admin-views/planning-view/group-planning/seances.json";
const fs = require("fs");

const readJsonFile = require("jsonfile");


const getSeance = router.get("/get", async function (req, res, next) {
  var groupName = req.query.groupName
  var folder = publicationFolder
  if(groupName.toLowerCase() == 'science de la vie') {
    folder = "src/app/user_Views/admin-views/planning-view/group-planning/science-de-la-vie.json"
  } else if(groupName.toLowerCase() == 'physique chimie') {
    folder = "src/app/user_Views/admin-views/planning-view/group-planning/physique-chimie.json"
  } else if(groupName.toLowerCase() == 'math') {
    folder = "src/app/user_Views/admin-views/planning-view/group-planning/math.json"
  }

  result = readJsonFile.readFileSync(folder);
  if (result.length === 0) {
    return res.status(204).send();
  }
  return res.status(200).send(readJsonFile.readFileSync(folder))
});

const setSeance = router.post("/add", function (req, res, next) {
  let groupName = req.query.groupName
  var folder = publicationFolder
  if(groupName.toLowerCase() == 'science de la vie') {
    folder = "src/app/user_Views/admin-views/planning-view/group-planning/science-de-la-vie.json"
  } else if(groupName.toLowerCase() == 'physique chimie') {
    folder = "src/app/user_Views/admin-views/planning-view/group-planning/physique-chimie.json"
  } else if(groupName.toLowerCase() == 'math') {
    folder = "src/app/user_Views/admin-views/planning-view/group-planning/math.json"
  }

  let JsonPublication = req.body;
  file = readJsonFile.readFileSync(folder);
  file.push(JsonPublication);
  fs.writeFile(folder, JSON.stringify(file), function (data) {});
  return res.status(200).send()
});


//https://stackoverflow.com/questions/23774231/how-do-i-remove-all-null-and-empty-string-values-from-an-object
const delSeance = router.post("/del", async function (req, res, next) {
  let index = req.body.index;
  let groupName = req.body.groupName
  console.log(groupName)
  var folder = publicationFolder
  if(groupName.toLowerCase() == 'science de la vie') {
    folder = "src/app/user_Views/admin-views/planning-view/group-planning/science-de-la-vie.json"
  } else if(groupName.toLowerCase() == 'physique chimie') {
    folder = "src/app/user_Views/admin-views/planning-view/group-planning/physique-chimie.json"
  } else if(groupName.toLowerCase() == 'math') {
    folder = "src/app/user_Views/admin-views/planning-view/group-planning/math.json"
  }
console.log(index)
let file = readJsonFile.readFileSync(folder);
 await Promise.resolve(delete file[index]).then(() =>{
  file.splice(index,1)

  newJson = JSON.stringify(
    file
  );
 });


  if (newJson === undefined) {
    //Triggered when 1 element left in the JSON file
    fs.writeFile(folder, "[]", function (data) {});
    return res.status(200).send()
  }
  fs.writeFile(folder, newJson, function (data) {});
  return res.status(200).send()
});

const modifySeance = router.post(
  "/modify",
  function (req, res, next) {
    let index = req.query.index;
    console.log(index)
    let newTitle = req.body.title;
    let newDate = req.body.date;
    let newContent = req.body.content;
    let extension = req.body.imgExtension
    let newImageName = "";
    if(req.body.imgName != undefined) {
      newImageName = req.body.imgName
    } else {
      newImageName = undefined
    }
    let post = readJsonFile.readFileSync(publicationFolder);
    post[index].title = newTitle;
    post[index].date = newDate;
    post[index].content = newContent;
    post[index].imgName = newImageName;
    post[index].imgExtension = extension;

    fs.writeFile(publicationFolder, JSON.stringify(post), function (data) {});
    return res.status(200).send()
  }
);
