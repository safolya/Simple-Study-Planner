const { default: mongoose } = require("mongoose");

const schema=mongoose.Schema;

const topicSchema=new schema({
    subjectId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"subject"
    },
  title:{
     type:String,
     required:true
  },
  description:{
     type:String
  },
   createdAt:{
    type:Date,
    default:Date.now
   }
});

module.exports=mongoose.model("topics",topicSchema);
