import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import mongoose from "mongoose";
import User, { IUser } from "../models/userModel";
import Task from "../models/taskModel";




const router = express.Router();


require("dotenv").config();

interface UserSession {
    userID: mongoose.Types.ObjectId; 
    username: string;
    email: string;
}

declare module "express-session" {
    interface SessionData {
        user?: UserSession; 
    }
}


function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.user && req.session.user.userID) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized: No session available' });
    }
  }
  



router.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (![username, email, password, confirmPassword].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Both passwords must match" });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: "Username not available" });
        }

        const hashedPassword = await hash(password, 10);
        const newUser: IUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        const token = jwt.sign(
            {
                userID: newUser._id,
                email: newUser.email,
                username: newUser.username
            },
            process.env.JWT_SECRET!
        );

        const userSession: UserSession = {
            userID: newUser._id,
            username,
            email
        };
        req.session.user = userSession;

        return res.status(201).json({
            message: "User registered successfully",
            token,
            nextStep: "/login"
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Error registering user" });
    }
});


   
router.post("/login", async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: "Email/Username and password are required" });
        }

        let user: IUser | null = null;

        // Check if the input is an email or username
        if (emailOrUsername.includes('@')) {
            user = await User.findOne({ email: emailOrUsername });
        } else {
            user = await User.findOne({ username: emailOrUsername });
        }

        if (!user) {
            return res.status(401).json({ message: "Invalid email/username or password" });
        }

        const isPasswordMatch = await compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email/username or password" });
        }

        const token = jwt.sign(
            {
                userID: user._id,
                email: user.email
            },
            process.env.JWT_SECRET || "default_secret",
        );

        const userSession = {
            userID: user._id,
            username: user.username,
            email: user.email
        };

        req.session.user = userSession;

        return res.status(200).json({
            message: "User login successful!.",
            userID: user._id,
            username: user.username,
            email: user.email,
            nextStep: "/next-dashboard",
            token,
        });
    } catch (error) {
        console.error("Error during user login:", error); 
        return res.status(500).json({ message: "Error logging in user" });
    }
});



router.post('/task', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const { task_name, task_priority, due_date } = req.body;

        if (![task_name, task_priority].every(field => field)) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!req.session.user || !req.session.user.userID) {
            return res.status(401).json({ message: 'Unauthorized: No session available' });
        }

        const task_author = req.session.user.userID;

        const newTask = new Task({ task_name, task_priority, task_author, due_date });
        await newTask.save();

        return res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        console.error('Error during task creation:', error);
        return res.status(500).json({ message: 'Error creating task' });
    }
});







export default router;