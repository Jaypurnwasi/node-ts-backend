import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
export const createUser = async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ success: false, message: "user already exists", error: "try using a different email " });
            return;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ name, email, age, password });
            res.status(200).json({ success: true, message: "user created succesfully", data: newUser });
            return;
        }
    }
    catch (err) {
        console.log("error while creating a new user ");
        console.log(err);
        res.status(400).json({ success: false, message: "error while creating new user ", error: err });
        return;
    }
};
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length == 0) {
            res.status(200).json({ success: true, message: "no users exists", data: users });
            return;
        }
        else {
            users.forEach((user) => {
                user.password = " ";
            });
            res.status(200).json({ success: true, message: "users fetched succesfully ", data: users });
            return;
        }
    }
    catch (err) {
        console.log("error while fetching all users ");
        console.log(err);
        res.status(400).json({ success: false, message: "error while fetching all users ", error: err });
        return;
    }
};
export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
        if (user) {
            res.status(200).json({ success: true, message: "user fetched succesfully ", data: user });
            return;
        }
        else {
            res.status(404).json({ success: true, message: "user does not exists" });
        }
    }
    catch (err) {
        console.log("error while finding user by id ");
        console.log(err);
        return;
    }
};
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, age } = req.body;
        const oldUser = await User.findById(id);
        if (oldUser) {
            const newUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
            if (newUser) {
                res.status(200).json({ success: true, message: "user updated succesfully", data: newUser });
                return;
            }
        }
        else {
            res.status(404).json({ success: true, message: "no user found with given id " });
            return;
        }
    }
    catch (err) {
        console.log("error while updating user");
        console.log(err);
        res.status(400).json({ success: false, message: "error while updating user" });
        return;
    }
};
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(200).json({ success: true, message: "user deleted succesfully", data: deletedUser });
            return;
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error deleting user", error: err });
        return;
    }
};
export const signUp = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(200).json({ success: true, message: "user email already exists " });
            return;
        }
        try {
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await User.create({ name, email, age, password: hashedPassword });
                res.status(200).json({ success: true, message: "user created signup succesfull ", data: newUser });
                return;
            }
        }
        catch (err) {
            console.log("error while hashing password ", err);
            res.status(400).json({ success: false, message: "Error while hashing password ", error: err });
            return;
        }
    }
    catch (err) {
        console.log("error while signup");
        res.status(400).json({ success: false, message: "Error deleting user", error: err });
        return;
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            res.status(200).json({ success: false, message: "user does not exists" });
            return;
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            res.status(200).json({ success: false, message: "user password is incorrect" });
            return;
        }
        const payload = {
            name: existingUser.name,
            id: existingUser._id
        };
        const token = jwt.sign(payload, 'my secret key ', { expiresIn: "1h" });
        res.status(200).json({ success: true, message: `${existingUser.name} logged in succesfully `, token });
        return;
    }
    catch (err) {
        console.log("error while login ", err);
        res.status(400).json({ success: false, message: "error while login ", error: err });
        return;
    }
};
//   export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//       // Extract token from headers
//       const authHeader = req.headers.authorization;
//       if (!authHeader || !authHeader.startsWith("Bearer ")) {
//          res.status(401).json({ success: false, message: "Access denied. No token provided" });
//          return 
//       }
//       const token:string = authHeader.split(" ")[1];
//       // Verify token
//       try{
//         const decoded = jwt.verify(token,'my secret key ')  as CustomJwtPayload;
//       req.user = decoded.id;
//         //   console.log(decoded)
//       next();
//       }
//       catch(err){
//         res.status(401).json({ success: false, message: "Invalid or expired token" ,error:err})
//       }
//     } catch (error) {
//        res.status(401).json({ success: false, message: "error while authentication token" });
//        return
//     }
//   };
