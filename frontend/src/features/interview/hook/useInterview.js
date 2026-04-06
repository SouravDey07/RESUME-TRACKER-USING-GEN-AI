import {generateInterviewReport,getInterviewReportById,getAllInterviewReports} from '../services/interview.api'
import {useContext} from 'react'
import {InterviewContext} from '../interview.context'

export const useInterview=()=>{
    const {loading,setLoading,report,setReport,reports,setReports}=useContext(InterviewContext);
    
    const handleGenerateReport=async({jobDescription,resume,selfDescription})=>{
        setLoading(true);
        try {
            const data=await generateInterviewReport({jobDescription,resume,selfDescription});
            setReport(data.result);
            return data.result;
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    const handleGetReportById=async({interviewId})=>{
        setLoading(true);
        try {
            const data=await getInterviewReportById({interviewId});
            setReport(data.interviewReport);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetAllReports=async()=>{
        setLoading(true);
        try {
            const data=await getAllInterviewReports();
            setReports(data.interviewReports);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        setLoading,
        report,
        setReport,
        reports,
        setReports,
        handleGenerateReport,
        handleGetReportById,
        handleGetAllReports
    }
}