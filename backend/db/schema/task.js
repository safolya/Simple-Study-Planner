const { default: mongoose } = require("mongoose");

const schema=mongoose.Schema;

const taskSchema=new schema({
   topicId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"topics"
   },
   plannedDate:{
    type:Date,
    required:true
   },
   status:{
    type:String,
    enum:["pending","in-progress","done"],
    required:true
   },
   notes:{
    type:String,
   },
   createdAt:{
    type:Date,
    default:Date.now
   }
})

module.exports=mongoose.model("task",taskSchema);
