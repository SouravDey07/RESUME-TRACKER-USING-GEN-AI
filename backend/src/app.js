const express=require("express");

const app=express();
//require all the routes here
const authrouter=require("./routes/auth.routes");

app.use(express.json())

//using all the routes here 
app.use("/api/auth",authrouter);


module.exports=app;