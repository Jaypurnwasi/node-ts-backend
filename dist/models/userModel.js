import mongoose from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;
