const express = require('express');
const path = require('path');
const userRoutes = require('./server/routes/user')
const fileRoutes = require('./server/routes/file')
const mailRoutes = require('./server/routes/mail')

const publicationRoutes = require('./server/routes/publication')
const app = express();
const port = process.env.PORT || 4200;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'dist/le-cos-mos-app'))); // Production directory

app.use('/publication',publicationRoutes);
app.use('/file',fileRoutes);
app.use('/user',userRoutes);
app.use('/mail',mailRoutes);


app.get('*',(req,res) => { //Catch all others routes request and return  the index
    res.sendFile(path.join(__dirname,'dist/le-cos-mos-app/index.html'))

})

app.listen(port,(req,res) =>{
    console.log("listening on port:" + port)
})


