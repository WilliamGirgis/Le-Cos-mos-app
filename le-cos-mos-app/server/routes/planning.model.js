
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://test:Samsam123@cluster0.pcin2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    //console.log('Connected successfuly')

})

const planningSchema = new mongoose.Schema({

   name: {
    type:String,
    required:true,
    unique:true
   },
   seance :[
    {
      matiere: {
        type:String,
        required:true
      },
      day: {
        type:String,
        required:true
      },
      creneau: {
        type:String,
        required:true
      }

    }
  ],
  user_list: [
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

   ]


  })





const Planning = mongoose.model('Planning',planningSchema);
module.exports = Planning
