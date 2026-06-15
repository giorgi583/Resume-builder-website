import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true});

userSchema.methods.comparePassword = async function(plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User