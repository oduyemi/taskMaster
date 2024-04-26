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
const userModel_1 = __importDefault(require("../models/userModel"));
const taskModel_1 = __importDefault(require("../models/taskModel"));
const taskCategoryModel_1 = __importDefault(require("../models/taskCategoryModel"));
const listModel_1 = __importDefault(require("../models/listModel"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({ message: "Welcome to LearnAPI" });
});
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        if (users.length === 0) {
            res.status(404).json({ Message: "Users not available" });
        }
        else {
            res.json({ data: users });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/users/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ Message: "User not found" });
        }
        else {
            res.json({ data: user });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
router.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskModel_1.default.find();
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error retrieving tasks:", error);
        return res.status(500).json({ message: "Error retrieving tasks" });
    }
}));
router.get("/tasks/:taskId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.taskId;
        const task = yield taskModel_1.default.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json(task);
    }
    catch (error) {
        console.error("Error retrieving task:", error);
        return res.status(500).json({ message: "Error retrieving task" });
    }
}));
router.get("/tasks/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield taskCategoryModel_1.default.find();
        return res.status(200).json(categories);
    }
    catch (error) {
        console.error("Error retrieving task categories:", error);
        return res.status(500).json({ message: "Error retrieving task categories" });
    }
}));
router.get("/tasks/categories/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const category = yield taskCategoryModel_1.default.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Task category not found" });
        }
        return res.status(200).json(category);
    }
    catch (error) {
        console.error("Error retrieving task category:", error);
        return res.status(500).json({ message: "Error retrieving task category" });
    }
}));
router.get("/tasks/lists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasklist = yield listModel_1.default.find();
        return res.status(200).json(tasklist);
    }
    catch (error) {
        console.error("Error retrieving task list:", error);
        return res.status(500).json({ message: "Error retrieving task list" });
    }
}));
router.get("/tasks/lists/:listId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listId = req.params.listId;
        const tasklist = yield listModel_1.default.findById(listId);
        if (!tasklist) {
            return res.status(404).json({ message: "Task list not found" });
        }
        return res.status(200).json(tasklist);
    }
    catch (error) {
        console.error("Error retrieving task list:", error);
        return res.status(500).json({ message: "Error retrieving task list" });
    }
}));
exports.default = router;
