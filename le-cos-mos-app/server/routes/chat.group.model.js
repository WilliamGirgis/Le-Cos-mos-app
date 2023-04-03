
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://test:Samsam123@cluster0.pcin2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    //console.log('Connected successfuly')

})


// Definir la table User ici
const groupSchema = new mongoose.Schema({

name : {
  type:String,
  required:true,
  unique:true
},
discussionType: {
  type:String,
  required:false
},
user_list : [
  {
    firstname: {
      type:String,
      required:true,
    },
    lastname: {
      type:String,
      required:true,
    },
    role: {
      type:String,
      required:true
    }
  }
],
message_list: [
  {
  message: {
    type:String,
           },
  emiter: {
    type:String
          },
  date: {
    type:String
        },
  file: {
    type:String,
    required:false
        }
  }
]

})




// Definir la table Cour ici

// Definir la table Discipline ici

// Definir la table Conversation ici


const Group = mongoose.model('Group',groupSchema);
module.exports = Group
