import imagekit from "../configs/imagekit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// controller for creating new resume
// POST: /api/resumes/create

export const createResume = async (req, res) => {
    try {
      const userId = req.userId;
      const { title } = req.body;
      const newresume = await Resume.create({ userId, title });
      return res.status(201).json({ message: 'Resume created successfully', resume: newresume });
    }
    catch(error) {
        return res.status(500).json({message: error.message})
    }
}

// controller for deleting new resume
// DELETE: /api/resumes/delete

export const deleteResume = async (req, res) => {
    try {
      const userId = req.userId;
      const resumeId = req.params.id;
      await Resume.findByIdAndDelete({userId, _id: resumeId});
      return res.status(200).json({ message: 'Resume deleted successfully' });
    }
    catch(error) {
        return res.status(500).json({message: error.message})
    }
}

// controller for getting user resume by id
// GET: /api/resumes/get

export const getResumeById = async (req, res) => {
    try {
      const userId = req.userId;
      const resumeId = req.params.id;
      const resume = await Resume.findOne({userId, _id: resumeId});
      if(!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      }
      resume.__v = undefined;
      resume.createdAt = undefined;
      resume.updatedAt = undefined;
      return res.status(200).json({ resume });
    }
    catch(error) {
        return res.status(500).json({message: error.message})
    }
}

// controller for getting user resume by id public
// GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
    const resumeId = req.params.id;
    try {
      const resume = await Resume.findOne({ public: true, _id: resumeId });
      if(!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      };
      return res.status(200).json({ resume });
    }
    catch(error) {
        return res.status(500).json({message: error.message})
    }
}

// controller for updating resume
// PUT: /api/resumes/update

export const updateResume = async (req, res) => {
    try {
      const userId = req.userId;
      const {resumeId, resumeData, removeBackground} = req.body;
      const image = req.file
      let resumeDataCopy = JSON.parse(resumeData);
      if(image) {
const imageBufferData = fs.createReadStream(image.path);

        const response = await imagekit.files.upload({
  file: imageBufferData,
  fileName: 'resume.png',
  folder: 'user-resumes',
  transformations: {
    pre: 'w-300, h-300, fo-face, z-0.75' + (removeBackground ? ', bg-remove' : '')
  }
});
resumeDataCopy.personal_info.image = response.url;
      }
      const resume = await Resume.findByIdAndUpdate({userId, _id: resumeId}, resumeDataCopy, {new: true});
      if(!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      }
      return res.status(200).json({ message: 'Resume updated successfully', resume });
    }
    catch(error) {
        return res.status(500).json({message: error.message})
    }
}