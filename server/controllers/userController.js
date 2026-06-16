import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from '../models/Resume.js'

const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token
}

// controller for user registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
    console.log(req.body)
try {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required'})
    }
    const user = await User.findOne({email})
    if(user) {
        return res.status(400).json({message: 'User already exists'})
    }
    const hashedpassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        name,
        email,
        password: hashedpassword
    })
    const token = generateToken(newUser._id)
    res.status(201).json({ message: 'User registered successfully', user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email, },
        token
    })
} catch (error) {
    return res.status(500).json({message: error.message})
}
}

// controller for user login
// POST: /api/users/login

export const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
   const user = await User.findOne({email})
   if(!user) {
    return res.status(400).json({message: 'User does not exist'})
   }
   if(!user.comparePassword(password)) {
    return res.status(400).json({message: 'Invalid password'})
   }
   const token = generateToken(user._id)
   res.status(200).json({message: 'Login successful', user: {
    _id: user._id,
    name: user.name,
    email: user.email,
   },
   token
   })
    }
    catch(error) {
        return res.status(500).json({message: error.message})
    }
}

// controller for getting user by id
// POST: /api/users/data

export const getUserById = async (req, res) => {
    const UserId = req.userId
    try {
        const user = await User.findById(id)
        if(!user) {
            return res.status(404).json({message: 'User does not exist'})
        }
        user.password = undefined
        res.status(200).json({message: 'User found', user})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// controller for getting user resumes
// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId

        // return user resumes
        const resumes = await Resume.find({userId})

       return res.status(200).json({message: 'User resumes found', resumes})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}