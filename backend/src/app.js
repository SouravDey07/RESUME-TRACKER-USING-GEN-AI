const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
//require all the routes here
const authrouter=require("./routes/auth.routes");

app.use(express.json())
app.use(cookieParser())
//using all the routes here 
app.use("/api/auth",authrouter);



module.exports=app;