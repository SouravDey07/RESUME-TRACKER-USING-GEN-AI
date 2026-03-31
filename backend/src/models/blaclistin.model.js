const mongoose=require("mongoose");

const blacklistToken=mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is required"]
    }
    
},{
    timestamps:true
})

const tokenBlacklistModel=mongoose.model("tokenBlacklist",blacklistToken);

module.exports=tokenBlacklistModel;


 


