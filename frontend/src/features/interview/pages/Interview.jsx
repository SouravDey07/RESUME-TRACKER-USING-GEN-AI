import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import '../style/interview.scss';
import { useInterview } from '../hook/useInterview';
import { useAuth } from '../../auth/hooks/useAuth';

export default function Interview() {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { report, loading, handleGetReportById } = useInterview();
  const { handleLogout } = useAuth();

  const [activeTab, setActiveTab] = useState('technical');
  const [expandedQuestion, setExpandedQuestion] = useState(0);

  const onLogout = async () => {
    await handleLogout();
    navigate('/');
  };

  useEffect(() => {
    if (interviewId && (!report || report._id !== interviewId)) {
      handleGetReportById({ interviewId });
    }
  }, [interviewId, report, handleGetReportById]);

  if (loading || !report) {
    return (
      <div className="interview-layout" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
        <h2 style={{margin: 'auto'}}>Loading Report...</h2>
      </div>
    );
  }

  const currentQuestions = activeTab === 'technical' ? (report.technicalQuestions || []) : (report.behaviouralQuestions || []);

  return (
    <div className="interview-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-title">RESUME TRACKER</span>
          <span className="logo-subtitle">PRECISION INTERVIEWING</span>
        </div>
        
        <nav className="main-nav">
          <a className="nav-item active" onClick={() => navigate('/dashboard')} style={{cursor: 'pointer'}}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Dashboard
          </a>
          <a className="nav-item" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Home
          </a>
        </nav>

        <nav className="bottom-nav">
          <a className="nav-item" onClick={onLogout} style={{cursor: 'pointer'}}>
             <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
             Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-title">
            <h3>Interview Report</h3>
          </div>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => navigate('/dashboard')} title="Back to Dashboard">
               <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
            <div className="profile-pic">
              <img src="https://i.pravatar.cc/100?img=33" alt="Profile" />
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          
          {/* Top Row: Score & Report */}
          <section className="row top-row">
            <div className="card match-card">
              <div className="verified-badge">VERIFIED</div>
              <div className="circular-progress">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle"
                    strokeDasharray={`${report.matchScore || 0}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">{report.matchScore || 0}%</text>
                  <text x="18" y="25" className="match-text">MATCH SCORE</text>
                </svg>
              </div>
              <div className="match-info">
                <h2>{report.matchScore >= 75 ? 'Good Match' : 'Potential Match'}</h2>
                <p>Alignment with technical requirements based on your resume.</p>
              </div>
            </div>

            <div className="card report-card">
              <div className="card-header">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <h3>Interview Report</h3>
              </div>
              <p className="summary-text">
                {report.interviewReport}
              </p>
            </div>
          </section>

          {/* Middle Row: Skill Gaps & Questions */}
          <section className="row middle-row">
            <div className="card gaps-card">
              <div className="card-header">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="#f87171" strokeWidth="2" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <h3>Skill Gaps</h3>
              </div>
              <ul className="gap-list">
                {report.skillGaps?.map((gap, idx) => (
                  <li key={idx}>
                    <span className="gap-label">{gap.skill}</span>
                    <span className={`badge ${gap.severity.toLowerCase()}`}>{gap.severity.toUpperCase()}</span>
                  </li>
                ))}
                {(!report.skillGaps || report.skillGaps.length === 0) && (
                  <li><span className="gap-label">No significant gaps detected</span></li>
                )}
              </ul>
            </div>

            <div className="card questions-card">
              <div className="tabs">
                <button 
                  className={activeTab === 'technical' ? 'active' : ''}
                  onClick={() => { setActiveTab('technical'); setExpandedQuestion(0); }}
                >
                  TECHNICAL
                </button>
                <button 
                  className={activeTab === 'behavioural' ? 'active' : ''}
                  onClick={() => { setActiveTab('behavioural'); setExpandedQuestion(0); }}
                >
                  BEHAVIOURAL
                </button>
              </div>

              <div className="accordion">
                {currentQuestions.map((q, idx) => (
                  <div key={idx} className={`accordion-item ${expandedQuestion === idx ? 'expanded' : ''}`}>
                    <div className="accordion-header" onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}>
                      <h4 className="question-title">"{q.question}"</h4>
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polyline points={expandedQuestion === idx ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline></svg>
                    </div>
                    {expandedQuestion === idx && (
                      <div className="accordion-body">
                        <div className="intention">
                          <h5>INTENTION</h5>
                          <p>{q.intention}</p>
                        </div>
                        <div className="ideal-answer">
                          <h5>AI-SUGGESTED IDEAL ANSWER</h5>
                          <p>{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {currentQuestions.length === 0 && (
                  <p style={{marginTop: '20px', color: '#a1a1aa'}}>No questions generated for this category.</p>
                )}
              </div>
            </div>
          </section>

          {/* Bottom Row: Prep Plan */}
          <section className="row bottom-row">
            <div className="card prep-card">
              <div className="card-header">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="#f472b6" strokeWidth="2" fill="none"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                <h3>Day-by-Day Prep Plan</h3>
              </div>

              <div className="plan-stages">
                {report.preparationPlan && report.preparationPlan.length > 0 ? (
                  report.preparationPlan.map((plan, idx) => (
                    <div key={idx} className="stage">
                      <h4 className="stage-title">
                        <span className="stage-num">Day {plan.day || (idx + 1)}</span> 
                        {plan.focus ? plan.focus.toUpperCase() : 'GENERAL PREPARATION'}
                      </h4>
                      {plan.tasks && plan.tasks.length > 0 ? (
                        plan.tasks.map((task, tIdx) => (
                          <div key={tIdx} className="task-box">
                            <p>{task}</p>
                          </div>
                        ))
                      ) : (
                        <div className="task-box"><p>Review fundamental concepts.</p></div>
                      )}
                    </div>
                  ))
                ) : (
                  <p style={{color: '#a1a1aa', fontStyle: 'italic', padding: '1rem 0'}}>
                    No detailed day-by-day prep plan was generated for this session. Use the skill gaps to plan your studying!
                  </p>
                )}
              </div>


            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
