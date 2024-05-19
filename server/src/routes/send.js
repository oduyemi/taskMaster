"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const userModel_1 = __importDefault(require("../models/userModel"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const router = express_1.default.Router();
require("dotenv").config();
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user && req.session.user.userID) {
        next();
    }
    else {
        res.status(401).json({ message: 'Unauthorized: No session available' });
    }
}
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (![username, email, password, confirmPassword].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Both passwords must match" });
        }
        const existingUserByEmail = yield userModel_1.default.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const existingUserByUsername = yield userModel_1.default.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: "Username not available" });
        }
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const newUser = new userModel_1.default({ username, email, password: hashedPassword });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({
            userID: newUser._id,
            email: newUser.email,
            username: newUser.username
        }, process.env.JWT_SECRET);
        const userSession = {
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
    }
    catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Error registering user" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emailOrUsername, password } = req.body;
        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: "Email/Username and password are required" });
        }
        let user = null;
        // Check if the input is an email or username
        if (emailOrUsername.includes('@')) {
            user = yield userModel_1.default.findOne({ email: emailOrUsername });
        }
        else {
            user = yield userModel_1.default.findOne({ username: emailOrUsername });
        }
        if (!user) {
            return res.status(401).json({ message: "Invalid email/username or password" });
        }
        const isPasswordMatch = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email/username or password" });
        }
        const token = jsonwebtoken_1.default.sign({
            userID: user._id,
            email: user.email
        }, process.env.JWT_SECRET || "default_secret");
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
    }
    catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ message: "Error logging in user" });
    }
}));
router.post('/task', isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_name, task_priority, due_date } = req.body;
        if (![task_name, task_priority].every(field => field)) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!req.session.user || !req.session.user.userID) {
            return res.status(401).json({ message: 'Unauthorized: No session available' });
        }
        const task_author = req.session.user.userID;
        const newTask = new taskModel_1.default({ task_name, task_priority, task_author, due_date });
        yield newTask.save();
        return res.status(201).json({ message: 'Task created successfully' });
    }
    catch (error) {
        console.error('Error during task creation:', error);
        return res.status(500).json({ message: 'Error creating task' });
    }
}));
exports.default = router;
