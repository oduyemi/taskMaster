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
const taskCategoryModel_1 = __importDefault(require("../models/taskCategoryModel"));
const listModel_1 = __importDefault(require("../models/listModel"));
const router = express_1.default.Router();
require("dotenv").config();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, cpwd } = req.body;
        if (![username, email, password, cpwd].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== cpwd) {
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
        const { email, username, password } = req.body;
        if ((!email && !username) || !password) {
            return res.status(400).json({ message: "Email/Username and password are required" });
        }
        let user = null;
        if (email) {
            user = yield userModel_1.default.findOne({ email });
        }
        if (!user && username) {
            user = yield userModel_1.default.findOne({ username });
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
router.post("/task", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, task_category_id, due_date } = req.body;
        if (![title, description, task_category_id, due_date].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newTask = new taskModel_1.default({ title, description, task_category_id, due_date });
        yield newTask.save();
        return res.status(201).json({ message: "Task created successfully" });
    }
    catch (error) {
        console.error("Error during task creation:", error);
        return res.status(500).json({ message: "Error creating task" });
    }
}));
router.post("/task-category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_category } = req.body;
        if (![task_category].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newCategory = new taskCategoryModel_1.default({ task_category });
        yield newCategory.save();
        return res.status(201).json({ message: "Task category created successfully" });
    }
    catch (error) {
        console.error("Error during task category creation:", error);
        return res.status(500).json({ message: "Error creating task category" });
    }
}));
router.post("/tasks/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, task_author, tasks } = req.body;
        if (![title, description, task_author, tasks].every(field => field)) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newList = new listModel_1.default({ title, description, task_author, tasks });
        yield newList.save();
        return res.status(201).json({ message: "Task list created successfully" });
    }
    catch (error) {
        console.error("Error during task list creation:", error);
        return res.status(500).json({ message: "Error creating task list" });
    }
}));
exports.default = router;
