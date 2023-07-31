
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

        creneau: [{ // Retirer les crochet créer une erreur -> Trouver la solution pour que cela fonctionne sans
          type:String,
          required:true
        }],
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
        },
        duree: { // 25 | 50 | 75 | 100 (with 100 = 60min & 25 = 15min)
          type:String,
          required:false

        },
        quartDheure : { // 00 | 15 | 30 | 45
          type:String,
          required:false
        },
        groupId: {
          type:String,
          required:true,
          unique:true
        },
        displayType: {
          type:Boolean,
          required:false
        },
        isLast: {
          type:Boolean,
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
        required:false
      },
    }

   ]


  })





  planningSchema.pre('save', function(next) {
    let user = this;
    next()

  }
  )
const Planning = mongoose.model('Planning',planningSchema);
module.exports = Planning
