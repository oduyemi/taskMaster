"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    task_category_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "TaskCategory",
        required: true,
    },
    task_author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    due_date: {
        type: Date,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
