import React,{useState,useRef,useEffect} from 'react'
import '../style/home.scss';
import { useAuth } from '../../auth/hooks/useAuth';
import { useInterview } from '../hook/useInterview';
import {useNavigate} from 'react-router';

function Home() {
  const { handleLogout } = useAuth();
  const {loading, handleGenerateReport, reports, handleGetAllReports } = useInterview();
  const navigate = useNavigate();

  const [jobDescription,setJobDescription]=useState("");
  const resumeInputRef=useRef(null);
  const [selfDescription,setSelfDescription]=useState("");

  useEffect(() => {
    handleGetAllReports();
  }, []);

  const handleGenerate = async () => {
    const resumeFile = resumeInputRef.current?.files[0];
    if (!resumeFile || !jobDescription || !selfDescription) {
        alert("Please fill all the fields");
        return;
    }
    const data=await handleGenerateReport({
        jobDescription,
        resume: resumeFile,
        selfDescription
    });
    if(data){
        navigate(`/interview/${data._id}`);
    }
  }

  return (
    <main className='home'>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <div className="header">
          <h1>Start Your Interview</h1>
          <p>Upload your resume and provide details so our AI can tailor the interview questions for you.</p>
        </div>
        <div className="content">
          <div className="left">
              <div className="input-group">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea name="jobDescription" id="jobDescription" value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} placeholder='Paste the target job description here...'></textarea>
              </div>
          </div>
          <div className="right">
             <div className="input-group">
              <label htmlFor="resume">Upload Resume</label>
              <input type="file" ref={resumeInputRef} name="resume" id="resume" accept=".pdf"/>
             </div> 
             <div className="input-group">
              <label htmlFor="selfDescription">Self Description</label>
              <input type="text" value={selfDescription} onChange={(e)=>setSelfDescription(e.target.value)} name="selfDescription" id="selfDescription" placeholder='Tell us a brief summary about yourself...' />
             </div> 
             <div className="actions">
               <button className="button primary-button" onClick={handleGenerate} disabled={loading}>{loading ? "Generating..." : "Generate Interview"}</button>
             </div>
          </div>
        </div>

        <div className="recent-interviews">
          <h2>Your Recent Interviews</h2>
          <div className="reports-grid">
            {reports && reports.length > 0 ? (
              reports.map((report) => (
                <div key={report._id} className="report-card" onClick={() => navigate(`/interview/${report._id}`)}>
                  <div className="report-card-header">
                    <h3>{report.title || 'Untitled Assessment'}</h3>
                    <span className="score-badge">{report.matchScore || 0}% Match</span>
                  </div>
                  <p className="report-snippet">
                    {report.interviewReport ? (report.interviewReport.substring(0, 100) + '...') : 'No summary available.'}
                  </p>
                  <button className="view-btn">View Full Report</button>
                </div>
              ))
            ) : (
               <p className="empty-state">No previous interviews found. Generate your first one above!</p>
            )}
          </div>
        </div>
    </main>
  )
}

export default Home