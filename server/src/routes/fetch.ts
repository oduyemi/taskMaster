import express, { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import Task from "../models/taskModel";
import TaskCategory from "../models/taskCategoryModel";
import List from "../models/listModel";


const router = express.Router();



router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to LearnAPI" });
    });

router.get("/users", async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await User.find();
        if (users.length === 0) {
            res.status(404).json({ Message: "Users not available" });
        } else {
            res.json({ data: users });
        }
        } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});

    
router.get("/users/:userId", async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user: IUser | null = await User.findById(userId);
    
        if (!user) {
        res.status(404).json({ Message: "User not found" });
        } else {
        res.json({ data: user });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});



router.get("/tasks", async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        return res.status(500).json({ message: "Error retrieving tasks" });
    }
});


router.get("/tasks/:taskId", async (req: Request, res: Response) => {
    try {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        return res.status(200).json(task);
    } catch (error) {
        console.error("Error retrieving task:", error);
        return res.status(500).json({ message: "Error retrieving task" });
    }
});


router.get("/tasks/categories", async (req: Request, res: Response) => {
    try {
        const categories = await TaskCategory.find();
        return res.status(200).json(categories);
    } catch (error) {
        console.error("Error retrieving task categories:", error);
        return res.status(500).json({ message: "Error retrieving task categories" });
    }
});


router.get("/tasks/categories/:categoryId", async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await TaskCategory.findById(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: "Task category not found" });
        }
        
        return res.status(200).json(category);
    } catch (error) {
        console.error("Error retrieving task category:", error);
        return res.status(500).json({ message: "Error retrieving task category" });
    }
});


router.get("/tasks/lists", async (req: Request, res: Response) => {
    try {
        const tasklist = await List.find();
        return res.status(200).json(tasklist);
    } catch (error) {
        console.error("Error retrieving task list:", error);
        return res.status(500).json({ message: "Error retrieving task list" });
    }
});


router.get("/tasks/lists/:listId", async (req: Request, res: Response) => {
    try {
        const listId = req.params.listId;
        const tasklist = await List.findById(listId);
        
        if (!tasklist) {
            return res.status(404).json({ message: "Task list not found" });
        }
        
        return res.status(200).json(tasklist);
    } catch (error) {
        console.error("Error retrieving task list:", error);
        return res.status(500).json({ message: "Error retrieving task list" });
    }
});





export default router;