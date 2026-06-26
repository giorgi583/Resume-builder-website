import dotenv from 'dotenv'
dotenv.config({ path: '../.env', quiet: true })
import Resume from '../models/Resume.js'
import AI from '../configs/ai.js'
// comtroller fo enhancing resume professional summary
// POST: /api/ai/enhance-pro-sum

export const enhanceProfessionalSummary = async (req, res) => {
    try {
const {userContent} = req.body
console.log(req.body)
if(!userContent) {
    return res.status(400).json({message: 'All fields are required'})
}
const response = await AI.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
        {role: 'system', content: "You are an expert in resume writing. your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text, no options or enything else."},    
        {role: 'user', content: userContent}
    ]
    } )
    const enhancedSummary = response.choices[0].message.content
    console.log(enhancedSummary)
res.status(200).json({message: 'Professional summary enhanced successfully', enhancedSummary})}
    catch(error) {
        console.error("Full error:", error);
  console.error("Status:", error.status);
  console.error("Message:", error.message);
  console.error("Response:", error.response?.data);
        return res.status(500).json({message: error.message})
    }
}


// comtroller fo enhancing resume job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
    try {
const {userContent} = req.body
console.log(userContent)
if(!userContent) {
    return res.status(400).json({message: 'All fields are required'})
}
const response = await AI.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
        {role: 'system', content: "You are an expert in resume writing. your task is to enhance the job description of a resume. The job description should be 1-2 sentences also highlighting key responsibilities and achievements. Use avtion verbs and quantifiable results where possible. Make it ATS-friendly. and only return text, no options or enything else."},     
        {role: 'user', content: userContent}
    ]
    } )
    const enhancedSummary = response.choices[0].message.content
    console.log(enhancedSummary)
res.status(200).json({message: 'Professional summary enhanced successfully', enhancedSummary})}
    catch(error) {
        console.error("Full error:", error);
        return res.status(500).json({message: error.message})
    }
}

// controller for uploading resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    
    try {
        const {resumeText, title} = req.body
        const userId = req.userId
        if(!resumeText) {
            return res.status(400).json({message: 'All fields are required'})
        }
        console.log("API key exists:", !!process.env.OPENAI_API_KEY);
console.log("API key prefix:", process.env.OPENAI_API_KEY?.slice(0, 10));
        const systemPrompt = "You are an expert AI agent to extract data from resume"
        const userPrompt = `extract data from this resume: ${resumeText} 
        Provide data in following json format with no additional text before or after: 
        { 
        professional_summary: {type: String, default: ''},
        skills: [{type: String, default: ''}],
        personal_info: {
        image: {type: String, default: ''},
        full_name: {type: String, default: ''},
        email: {type: String, default: ''},
        phone: {type: String, default: ''},
        location: {type: String, default: ''},
        profession: {type: String, default: ''},
        linkedin: {type: String, default: ''},
        website: {type: String, default: ''},
    },
        experience: [{
        company: {type: String, default: ''},
        position: {type: String, default: ''},
        start_date: {type: Date, default: new Date()},
        end_date: {type: Date, default: new Date()},
        description: {type: String, default: ''},
        is_current: {type: Boolean, default: false},
    }],
        projects: [{
        name: {type: String, default: ''},
        type: {type: String, default: ''},
        description: {type: String, default: ''},
    }],
        education: [{
        institution: {type: String, default: ''},
        degree: {type: String, default: ''},
        field: {type: String, default: ''},
        graduation_date: {type: Date, default: new Date()},
        gpa: {type: String, default: ''},
    }]}`
    console.log("System prompt length:", systemPrompt.length);
console.log("User prompt length:", userPrompt.length);
        const response = await AI.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages: [
        {role: 'system', content: systemPrompt},     
        {role: 'user', content: userPrompt}
    ],
    response_format: {type: 'json_object'}
    } )
    console.log(response)
    const extractedData = response.choices[0].message.content
    const parsedData = JSON.parse(extractedData)
    parsedData.experience = parsedData.experience?.map(exp => ({
    ...exp,
    end_date:
        exp.end_date === "Present" ||
        exp.end_date === "present"
            ? null
            : exp.end_date
}));
    const resume = await Resume.create({userId, title, ...parsedData})
    console.log("Created resume:", resume);
    res.json({resumeId: resume._id})
    } catch (error) {
       console.error("Status:", error.status);
  console.error("Message:", error.message);
  console.error("Full error:", error);

  throw error;

    if (error.response) {
        console.log(await error.response.text?.());
    }
        return res.status(500).json({message: error.message})
    }
}