import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully");
        })
        let mongodbURI = process.env.MONGODB_URI;
        const projectName = 'Resume-Builder';
        if(!mongodbURI) {
            throw new Error('MONGODB_URI is not defined');
        }
        if(mongodbURI.endsWith('/')) {
            mongodbURI = mongodbURI.slice(0, -1);
        }
        await mongoose.connect(`${mongodbURI}/${projectName}`);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;