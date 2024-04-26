import express, { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/userModel";
import Task from "../models/taskModel";
import TaskCategory from "../models/taskCategoryModel";
import List from "../models/listModel";

const router = express.Router();



router.delete("/tasks/:taskId/delete", async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId;
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const taskUserID = task.task_author.toString(); 
        if (taskUserID !== req.session.user.userID.toString()) {
            return res.status(401).json({ message: "Unauthorized: User not authorized to delete this task" });
        }

        await Task.findByIdAndDelete(taskId); 
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



router.delete("/users/:userId/delete", async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!req.session.user || req.session.user.userID.toString() !== userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in or unauthorized to perform this action" });
        }       

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(userId);
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
            }
        });
        res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
        console.error("Error deleting user account:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});







export default router;