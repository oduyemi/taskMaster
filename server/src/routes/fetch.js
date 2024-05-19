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
const holidaysModel_1 = __importDefault(require("../models/holidaysModel"));
const router = express_1.default.Router();
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user && req.session.user.userID) {
        next();
    }
    else {
        res.status(401).json({ message: 'Unauthorized: No session available' });
    }
}
router.get("/", (req, res) => {
    res.json({ message: "Welcome to TaskMaster API" });
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
router.get('/tasks', isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.userID;
        const tasks = yield taskModel_1.default.find({ task_author: userId });
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Error retrieving tasks" });
    }
}));
router.get("/tasks/:taskId", isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const userId = (_d = (_c = req.session) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.userID;
        const taskId = req.params.taskId;
        const task = yield taskModel_1.default.findOne({ _id: taskId, task_author: userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or you do not have access" });
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.error("Error retrieving task:", error);
        res.status(500).json({ message: "Error retrieving task" });
    }
}));
router.get('/tasks/could', isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const userId = (_f = (_e = req.session) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.userID;
        const tasks = yield taskModel_1.default.find({ task_author: userId, task_priority: 'could' });
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error('Error retrieving "could do" tasks:', error);
        res.status(500).json({ message: 'Error retrieving "could do" tasks' });
    }
}));
router.get('/tasks/should', isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    try {
        const userId = (_h = (_g = req.session) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h.userID;
        const tasks = yield taskModel_1.default.find({ task_author: userId, task_priority: 'should' });
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error('Error retrieving "should do" tasks:', error);
        res.status(500).json({ message: 'Error retrieving "should do" tasks' });
    }
}));
router.get('/tasks/must', isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    try {
        const userId = (_k = (_j = req.session) === null || _j === void 0 ? void 0 : _j.user) === null || _k === void 0 ? void 0 : _k.userID;
        const tasks = yield taskModel_1.default.find({ task_author: userId, task_priority: 'must' });
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error('Error retrieving "must do" tasks:', error);
        res.status(500).json({ message: 'Error retrieving "must do" tasks' });
    }
}));
router.get("/holidays", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const holidays = yield holidaysModel_1.default.find();
        if (holidays.length === 0) {
            res.status(404).json({ Message: "Holidays not available" });
        }
        else {
            res.json({ data: holidays });
        }
    }
    catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
}));
exports.default = router;
