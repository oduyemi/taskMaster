import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import Task from "../models/taskModel";



const router = express.Router();


function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.user && req.session.user.userID) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized: No session available' });
    }
  }




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



router.put('/tasks/:taskId', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.session?.user?.userID;
      const taskId = req.params.taskId;
      const { task_name, task_priority, due_date } = req.body;
  
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      if (task.task_author.toString() !== userId?.toString()) {
        return res.status(403).json({ message: 'Forbidden: You are not allowed to update this task' });
      }
  
      if (task_name) task.task_name = task_name;
      if (task_priority) task.task_priority = task_priority;
      if (due_date) task.due_date = due_date;

      await task.save();
  
      res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });





export default router;