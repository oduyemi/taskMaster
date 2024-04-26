import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import mongoose from "mongoose";
import User, { IUser } from "../models/userModel";
import Task from "../models/taskModel";
import TaskCategory from "../models/taskCategoryModel";
import List from "../models/listModel";



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


router.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, email, password, cpwd } = req.body;
        if (![username, email, password, cpwd].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== cpwd) {
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
            nextStep: "/next-login-page"
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Error registering user" });
    }
});


   
router.post("/login", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if ((!email && !username) || !password) {
            return res.status(400).json({ message: "Email/Username and password are required" });
        }

        let user: IUser | null = null;
        if (email) {
            user = await User.findOne({ email });
        }

        if (!user && username) {
            user = await User.findOne({ username });
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
            nextStep: "/next-dashboard",
            token,
        });
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ message: "Error logging in user" });
    }
});


router.post("/task", async (req: Request, res: Response) => {
    try {
        const { title, description, task_category_id, due_date } = req.body;
        if (![title, description, task_category_id, due_date].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTask = new Task({ title, description, task_category_id, due_date });
        await newTask.save();

        return res.status(201).json({ message: "Task created successfully" });
    } catch (error) {
        console.error("Error during task creation:", error);
        return res.status(500).json({ message: "Error creating task" });
    }
});


router.post("/task-category", async (req: Request, res: Response) => {
    try {
        const { task_category } = req.body;
        if (![task_category].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newCategory = new TaskCategory({ task_category });

        await newCategory.save();

        return res.status(201).json({ message: "Task category created successfully" });
    } catch (error) {
        console.error("Error during task category creation:", error);
        return res.status(500).json({ message: "Error creating task category" });
    }
});


router.post("/tasks/list", async (req: Request, res: Response) => {
    try {
        const { title, description, task_author, tasks } = req.body;
        if (![title, description, task_author, tasks].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newList = new List({ title, description, task_author, tasks });
        await newList.save();

        return res.status(201).json({ message: "Task list created successfully" });
    } catch (error) {
        console.error("Error during task list creation:", error);
        return res.status(500).json({ message: "Error creating task list" });
    }
});




export default router;