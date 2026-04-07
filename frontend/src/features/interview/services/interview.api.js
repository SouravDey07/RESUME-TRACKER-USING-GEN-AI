import axios from 'axios';

const api=axios.create({
    baseURL:"https://resume-tracker-backend-wiav.onrender.com/api",
    withCredentials:true
})

export const generateInterviewReport=async({jobDescription,resume,selfDescription})=>{
    const formData=new FormData();
    formData.append("jobDescription",jobDescription);
    formData.append("resume",resume);
    formData.append("selfDescription",selfDescription);
    const response=await api.post("/interview",formData,{headers:{"Content-Type":"multipart/form-data"}});
    return response.data;
}

export const getInterviewReportById=async({interviewId})=>{
    const response=await api.get(`/interview/report/${interviewId}`);
    return response.data;
}

export const getAllInterviewReports=async()=>{
    const response=await api.get("/interview");
    return response.data;
}


