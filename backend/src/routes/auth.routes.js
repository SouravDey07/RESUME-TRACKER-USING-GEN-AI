const express=require("express");
const authController=require("../controllers/auth.controller");

const authrouter=express.Router();

authrouter.post("/register",authController.registerUser);

authrouter.post("/login",authController.loginUser);

authrouter.get("/logout",authController.logoutUser);

module.exports=authrouter;