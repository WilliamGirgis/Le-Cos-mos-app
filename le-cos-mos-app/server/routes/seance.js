const express = require("express");
const router = express.Router();

module.exports = router;

let publicationFolder =
  "src/app/user_Views/admin-views/planning-view/group-planning/seances";
const fs = require("fs");

const readJsonFile = require("jsonfile");


const getSeance = router.get("/get", async function (req, res, next) {
  var folder = publicationFolder
  var groupName = req.query.groupName.replace(/ /g,'_')
  let result = []
let index = 0
let funded = false
   fs.readdir(folder, async (err, files) => {
     files.forEach(async file => {
      index++
      if(file.search(`${groupName}.json`) == 0) {
        funded = true
        console.log("File Found ! ")
        result = await readJsonFile.readFileSync(folder + '/' + groupName + '.json');
          if (result.length === 0) {
        return res.status(204).send();
             }
        return res.status(200).send(result)
     } else if(index == files.length && !funded) {
      console.log("File Written !")
    result =  fs.writeFileSync(folder + '/' + groupName + '.json', '[]', async function (data) {
      return  res.status(200).send(result);
     });
     }
    })
  });

});

const setSeance = router.post("/add", async function (req, res, next) {
  var groupName = req.query.groupName.replace(/ /g,'_')
  var folder = publicationFolder
  let JsonPublication = req.body;
  file = await readJsonFile.readFileSync(folder + '/' + groupName + '.json');
  file.push(JsonPublication);
  fs.writeFile(folder + '/' + groupName + '.json', JSON.stringify(file), function (data) {
    return res.status(200).send()

  });
});
 //folder + '/' + groupName + '.json', `[${JSON.stringify(file)}]`

//https://stackoverflow.com/questions/23774231/how-do-i-remove-all-null-and-empty-string-values-from-an-object
const delSeance = router.post("/del", async function (req, res, next) {
  let index = req.body.index;
  let groupName = req.body.groupName.replace(/ /g,'_')
  console.log(groupName)
  var folder = publicationFolder
let file = readJsonFile.readFileSync(folder + '/' + groupName + '.json');
 await Promise.resolve(delete file[index]).then(() =>{
  file.splice(index,1)

  newJson = JSON.stringify(
    file
  );
 });


  if (newJson === undefined) {
    //Triggered when 1 element left in the JSON file
    fs.writeFile(folder + '/' + groupName + '.json', "[]", function (data) {});
    return res.status(200).send()
  }
  fs.writeFile(folder + '/' + groupName + '.json', newJson, function (data) {});
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
