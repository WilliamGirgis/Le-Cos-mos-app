const { stubFalse } = require('lodash');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://test:Samsam123@cluster0.pcin2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    //console.log('Connected successfuly')

})

// Definir la table User ici
const logSchema = new mongoose.Schema({

UserID : {
  type:String,
  required:false,
  unique:false
},
    firstname: {
      type:String,
      required:true,
    },
    lastname: {
      type:String,
      required:true,
    },
    date: {
      type:String,
      required:true,
    },
    action: {
      type:String,
      required:true
    }
})




// Definir la table Cour ici

// Definir la table Discipline ici

// Definir la table Conversation ici


const Log = mongoose.model('Log',logSchema);
module.exports = Log
