import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connect = async () => {
    try {
        const connection = await mongoose.connect('mongodb+srv://jaypurnwasi:43mBo60BmigaZYAi@cluster0.m99iw.mongodb.net/UserDb');
        console.log("db connected succesfully ");
    }
    catch (err) {
        console.log("error while db connection ");
        console.log(err);
    }
};
export default connect;
