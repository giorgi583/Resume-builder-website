import mongoose from "mongoose";


const resumeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, default: 'Untitled Resume'},
    public: {type: Boolean, default: false},
    template: {type: String, default: 'classic'},
    accent_color: {type: String, default: '#3b82f6'},
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
    }],
}, {timestamps: true, minimize: false});



const Resume = mongoose.model("Resume", resumeSchema);
export default Resume