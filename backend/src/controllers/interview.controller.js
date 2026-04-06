const { PDFParse } = require("pdf-parse");
const {generateInterviewReport}=require("../services/ai.service");
const interviewReportModel=require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
    const file = req.file;

    const parser = new PDFParse({ data: file.buffer });
    const data = await parser.getText();
    await parser.destroy();
    const resumeContent = data.text;

    const { selfDescription, jobDescription } = req.body;

    const interviewReport = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    });

    const result = await interviewReportModel.create({
        resume: resumeContent,
        selfDescription,
        jobDescription,
        user: req.user.id,
        ...interviewReport
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        result
    });
}

async function getInterviewReportControllerById(req, res) {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findById(interviewId);
    res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    });
}

async function getInterviewReportControllerUser(req,res){
    const interviewReports=await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
    res.status(200).json({
        message:"Interview reports fetched successfully",
        interviewReports
    })
}

module.exports={generateInterviewReportController,getInterviewReportControllerById,getInterviewReportControllerUser}