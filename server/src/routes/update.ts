import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import Task from "../models/taskModel";
import TaskCategory from "../models/taskCategoryModel";
import List from "../models/listModel";

const router = express.Router();



router.put("/users/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!req.session.user || req.session.user.userID.toString() !== userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in or unauthorized to perform this action" });
        }

        const { username, email, phone, img } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({ message: "User details updated successfully" });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.put("/users/:userId/resetpassword", async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!req.session.user || req.session.user.userID.toString() !== userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in or unauthorized to perform this action" });
        }

        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!newPassword !== confirmNewPassword) {
            return res.status(404).json({ message: "Both passwords must match!" });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting user password:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.put("/tasks/:taskId", async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { title, description, task_category_id, due_date } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (task_category_id) task.task_category_id = task_category_id;
        if (due_date) task.due_date = due_date;

        await task.save();

        res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.put("/tasks/categories/:categoryId", async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const { task_category } = req.body;

        const category = await TaskCategory.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Task category not found" });
        }

        if (task_category) category.task_category = task_category;

        await category.save();

        res.status(200).json({ message: "Task category updated successfully" });
    } catch (error) {
        console.error("Error updating task category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.put("/tasks/lists/:listId", async (req, res) => {
    try {
        const listId = req.params.listId;
        const { title, description, task_author, tasks } = req.body;

        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: "Task list not found" });
        }

        if (title) list.title = title;
        if (description) list.description = description;
        if (task_author) list.task_author = task_author;
        if (tasks) list.tasks = tasks;

        await list.save();

        res.status(200).json({ message: "Task list updated successfully" });
    } catch (error) {
        console.error("Error updating task list:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



export default router;