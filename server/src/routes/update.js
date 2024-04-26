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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const taskCategoryModel_1 = __importDefault(require("../models/taskCategoryModel"));
const listModel_1 = __importDefault(require("../models/listModel"));
const router = express_1.default.Router();
router.put("/users/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!req.session.user || req.session.user.userID.toString() !== userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in or unauthorized to perform this action" });
        }
        const { username, email, phone, img } = req.body;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        yield user.save();
        res.status(200).json({ message: "User details updated successfully" });
    }
    catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.put("/users/:userId/resetpassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!req.session.user || req.session.user.userID.toString() !== userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in or unauthorized to perform this action" });
        }
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!newPassword !== confirmNewPassword) {
            return res.status(404).json({ message: "Both passwords must match!" });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }
        user.password = yield bcrypt_1.default.hash(newPassword, 10);
        yield user.save();
        res.status(200).json({ message: "Password reset successfully" });
    }
    catch (error) {
        console.error("Error resetting user password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.put("/tasks/:taskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.taskId;
        const { title, description, task_category_id, due_date } = req.body;
        const task = yield taskModel_1.default.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (title)
            task.title = title;
        if (description)
            task.description = description;
        if (task_category_id)
            task.task_category_id = task_category_id;
        if (due_date)
            task.due_date = due_date;
        yield task.save();
        res.status(200).json({ message: "Task updated successfully" });
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.put("/tasks/categories/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const { task_category } = req.body;
        const category = yield taskCategoryModel_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Task category not found" });
        }
        if (task_category)
            category.task_category = task_category;
        yield category.save();
        res.status(200).json({ message: "Task category updated successfully" });
    }
    catch (error) {
        console.error("Error updating task category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
router.put("/tasks/lists/:listId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listId = req.params.listId;
        const { title, description, task_author, tasks } = req.body;
        const list = yield listModel_1.default.findById(listId);
        if (!list) {
            return res.status(404).json({ message: "Task list not found" });
        }
        if (title)
            list.title = title;
        if (description)
            list.description = description;
        if (task_author)
            list.task_author = task_author;
        if (tasks)
            list.tasks = tasks;
        yield list.save();
        res.status(200).json({ message: "Task list updated successfully" });
    }
    catch (error) {
        console.error("Error updating task list:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;
