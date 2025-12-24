const { default: mongoose, mongo } = require("mongoose");

const schema=mongoose.Schema;

const subjectSchema=new schema({
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
   },
   name:{
    type:String,
    required:true
   },
   code:{
    type:String,
    required:true
   },
   createdAt:{
    type:Date,
    default:Date.now
   }
})

module.exports=mongoose.model("subject",subjectSchema);
