
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://test:Samsam123@cluster0.pcin2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    //console.log('Connected successfuly')

})

// Créer Planning.pre('save',function() => {

// })
const planningSchema = new mongoose.Schema({

   groupName: { // If type = Enseignant, groupName = Enseignant.first + Enseignant.lastname
    type:String,
    required:true,
    unique:true
   },
   istronCommun:{
type:Boolean,
required:true
},
type:{
 type:String,
 required:true

},
   week: [{
    weekDate: {
     type:String,
     required:true
    },
    seance :[

      { // 7 Jours par semaine

        creneau: {
          type:String,
          required:true
        },
        matiere: {
          type:String,
          required:true
        },
        type:{
          type:String,
          required:true
        },
        day: {
          type:String,
          required:true
        },
        room: {
          type:String,
          required:false
        }

      }
    ]
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
      email : {
        type:String,
        required:true,
      },
      role: {
        type:String,
        required:true
      },
      planningNameGroupBelonging: {
        type:String,
        required:true,
        unique:false
      },

    }

   ]


  })





  planningSchema.pre('save', function(next) {
    let user = this;
    console.log(user)
    next()

  }
  )
const Planning = mongoose.model('Planning',planningSchema);
module.exports = Planning
