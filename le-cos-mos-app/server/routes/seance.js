const express = require("express");
const router = express.Router();

module.exports = router;

const publicationFolder =
  "src/app/user_Views/admin-views/planning-view/group-planning/seances.json";
const fs = require("fs");

const readJsonFile = require("jsonfile");


const getSeance = router.get("/get", function (req, res, next) {
  result = readJsonFile.readFileSync(publicationFolder);
  if (result.length === 0) {
    return res.send().status(204);
  }
  return res.send(readJsonFile.readFileSync(publicationFolder)).status(200);
});

const setSeance = router.post("/add", function (req, res, next) {
  let JsonPublication = req.body;
  file = readJsonFile.readFileSync(publicationFolder);
  file.push(JsonPublication);
  fs.writeFile(publicationFolder, JSON.stringify(file), function (data) {});
  return res.send().status(200);
});


//https://stackoverflow.com/questions/23774231/how-do-i-remove-all-null-and-empty-string-values-from-an-object
const delSeance = router.post("/del", function (req, res, next) {
  let index = req.body.index;
  let file = readJsonFile.readFileSync(publicationFolder);
  delete file[index];

  newJson = JSON.stringify(
    file,
    (k, v) =>
      Array.isArray(v) && !(v = v.filter((e) => e)).length ? void 0 : v,
    2
  );
  if (newJson === undefined) {
    //Triggered when 1 element left in the JSON file
    fs.writeFile(publicationFolder, "[]", function (data) {});
    return res.send().status(200);
  }
  fs.writeFile(publicationFolder, newJson, function (data) {});
  return res.send().status(200);
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
    return res.send().status(200);
  }
);
