const express = require('express');
const path = require('path');
const userRoutes = require('./server/routes/user')
const fileRoutes = require('./server/routes/file')
const mailRoutes = require('./server/routes/mail')
const logRoutes = require('./server/routes/log')
const msgRoutes = require('./server/routes/chat')
const planningRoutes = require('./server/routes/planning')

const publicationRoutes = require('./server/routes/publication')

const seanceRoutes = require('./server/routes/seance')
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
app.use('/log',logRoutes);
app.use('/chat',msgRoutes);
app.use('/planning',planningRoutes);
app.use('/seance',seanceRoutes)


app.get('*',(req,res) => { //Catch all others routes request and return  the index
    res.sendFile(path.join(__dirname,'dist/le-cos-mos-app/index.html'))
})
const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders:['my-custom-header'],
    credentials:true
  }
});

io.listen(3000,(req,res) =>{
  console.log("listening on port :3000")

})
io.on("connect", (socket) => {
  console.log(`User has connected !`);
  const Group = require("./server/routes/chat.group.model");
Group.watch().on('change', async data => {
socket.send('Message added ! ')
});
  socket.on('message', (params, callback) => {
   // send data back to client by using ack callback
 })
});

server.listen(port,(req,res) =>{
    console.log("listening on port:" + port)

})
