const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exits"],
        require:true
    },
    email:{
        type:String,
        unique:[true,"email id already exits"],
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model("User",userSchema);