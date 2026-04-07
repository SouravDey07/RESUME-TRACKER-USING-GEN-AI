const express=require("express");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const app=express();
//require all the routes here
const authrouter=require("./routes/auth.routes");
const interviewrouter=require("./routes/interview.routes");

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://resume-tracker-frontend-kq6x.onrender.com",
    credentials:true
}))
//using all the routes here 
app.use("/api/auth",authrouter);
app.use("/api/interview",interviewrouter);



module.exports=app;
