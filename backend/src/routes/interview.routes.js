const express=require('express');
const interviewRouter=express.Router();
const interviewController=require("../controllers/interview.controller");
const upload=require("../middlewares/file.middleware");
const authMiddleware=require("../middlewares/auth.middleware");

interviewRouter.post('/',authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController);

interviewRouter.get('/report/:interviewId',authMiddleware.authUser,interviewController.getInterviewReportControllerById);

interviewRouter.get('/',authMiddleware.authUser,interviewController.getInterviewReportControllerUser);



module.exports=interviewRouter;