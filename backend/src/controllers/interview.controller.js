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

module.exports={generateInterviewReportController}