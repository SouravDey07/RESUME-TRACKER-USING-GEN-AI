const {GoogleGenAI, Type} =require("@google/genai");

const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
});

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        interviewReport: { type: Type.STRING, description: "A thorough summary of the candidate's profile, including strengths, weaknesses, and overall fit for this role." },
        matchScore: { type: Type.NUMBER, description: "Match Score" },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical Questions",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "Question" },
                    intention: { type: Type.STRING, description: "Intention" },
                    answer: { type: Type.STRING, description: "Answer" }
                }
            }
        },
        behaviouralQuestions: {
            type: Type.ARRAY,
            description: "Behavioural Questions",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "Question" },
                    intention: { type: Type.STRING, description: "Intention" },
                    answer: { type: Type.STRING, description: "Answer" }
                }
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "Skill" },
                    severity: { type: Type.STRING, description: "Severity", enum: ["high", "medium", "low"] }
                }
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.NUMBER, description: "Day" },
                    focus: { type: Type.STRING, description: "Focus" },
                    tasks: {
                        type: Type.ARRAY,
                        description: "Tasks",
                        items: { type: Type.STRING }
                    }
                }
            }
        }
    }
};


async function generateInterviewReport({resume,selfDescription,jobDescription}){
    const prompt=`You are an expert technical interviewer and recruiter. Analyze the candidate's profile against the job description and generate a comprehensive interview report that adheres strictly to the provided output schema.

    Here are the inputs:
    ---
    Resume: 
    ${resume}
    
    Candidate Self Description: 
    ${selfDescription}
    
    Job Description: 
    ${jobDescription}
    ---
    
    Please provide your output exactly according to the schema constraints, ensuring you cover:
    1. matchScore: A number from 0 to 100 indicating how closely the candidate matches the job description.
    2. interviewReport: A thorough summary of the candidate's profile, including strengths, weaknesses, and overall fit for this role.
    3. technicalQuestions: Provide highly relevant technical questions based specifically on the technologies mentioned in the candidate's profile and the job description. For each, give the question, what you intend to evaluate (intention), and an ideal answer.
    4. behaviouralQuestions: Provide behavioral questions relevant to their level of experience. Include intention and ideal answers.
    5. skillGaps: List any crucial skills missing from the candidate's profile that are required in the job description, assessing severity (High/Medium/Low).
    6. preparationPlan: Create a 3-day step-by-step study plan to help the candidate prepare for this exact interview.`;

    const response=await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema: interviewReportSchema
        }
    })
    return JSON.parse(response.text);
}

module.exports={generateInterviewReport}