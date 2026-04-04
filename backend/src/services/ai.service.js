const {GoogleGenAI} =require("@google/genai");
const {z}=require("zod");
const {zodToJsonSchema}=require("zod-to-json-schema");

const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
});

const interviewReportSchema=z.object({
    jobDescription:z.string().describe("Echo the original job description"),
    resume:z.string().describe("Echo the original resume"),
    selfDescription:z.string().describe("Echo the original self description"),
    interviewReport:z.string().describe("A thorough summary of the candidate's profile, including strengths, weaknesses, and overall fit for this role."),
    matchScore:z.number().describe("Match Score"),
    technicalQuestions:z.array(z.object({
        question:z.string().describe("Question"),
        intention:z.string().describe("Intention"),
        answer:z.string().describe("Answer")
    })).describe("Technical Questions"),
    behaviouralQuestions:z.array(z.object({
        question:z.string().describe("Question"),
        intention:z.string().describe("Intention"),
        answer:z.string().describe("Answer")
    })).describe("Behavioural Questions"),
    skillGaps:z.array(z.object({
        skill:z.string().describe("Skill"),
        severity:z.enum(["high","medium","low"]).describe("Severity")
    })),
    preparationPlan:z.array(z.object({
        day:z.number().describe("Day"),
        focus:z.string().describe("Focus"),
        tasks:z.array(z.string().describe("Tasks"))
    }))
})


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
    2. jobDescription, resume, selfDescription: Echo these original inputs so they are preserved in the response.
    3. interviewReport: A thorough summary of the candidate's profile, including strengths, weaknesses, and overall fit for this role.
    4. technicalQuestions: Provide highly relevant technical questions based specifically on the technologies mentioned in the candidate's profile and the job description. For each, give the question, what you intend to evaluate (intention), and an ideal answer.
    5. behaviouralQuestions: Provide behavioral questions relevant to their level of experience. Include intention and ideal answers.
    6. skillGaps: List any crucial skills missing from the candidate's profile that are required in the job description, assessing severity (High/Medium/Low).
    7. preparationPlan: Create a 3-day step-by-step study plan to help the candidate prepare for this exact interview.`;

    const response=await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:zodToJsonSchema(interviewReportSchema)
        }
    })
    return JSON.parse(response.text);
}

module.exports={generateInterviewReport}