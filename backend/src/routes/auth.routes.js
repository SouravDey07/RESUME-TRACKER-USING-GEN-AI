const express=require("express");
const authController=require("../controllers/auth.controller");
const authMiddleware=require("../middlewares/auth.middleware");

const authrouter=express.Router();

authrouter.post("/register",authController.registerUser);

authrouter.post("/login",authController.loginUser);

authrouter.get("/logout",authController.logoutUser);

authrouter.get("/get-me",authMiddleware.authUser,authController.getMeController);

module.exports=authrouter;