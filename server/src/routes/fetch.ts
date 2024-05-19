import express, { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/userModel";
import Task from "../models/taskModel";
import Holidays, { IHolidays} from "../models/holidaysModel";


const router = express.Router();

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.user && req.session.user.userID) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized: No session available' });
    }
  }




router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to TaskMaster API" });
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



router.get('/tasks', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.session?.user?.userID;
      const tasks = await Task.find({ task_author: userId });
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error retrieving tasks:", error);
      res.status(500).json({ message: "Error retrieving tasks" });
    }
  });
  

router.get("/tasks/:taskId", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.session?.user?.userID;
      const taskId = req.params.taskId;
      const task = await Task.findOne({ _id: taskId, task_author: userId });
  
      if (!task) {
        return res.status(404).json({ message: "Task not found or you do not have access" });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.error("Error retrieving task:", error);
      res.status(500).json({ message: "Error retrieving task" });
    }
  });
  

router.get('/tasks/could', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.session?.user?.userID;
      const tasks = await Task.find({ task_author: userId, task_priority: 'could' });

      res.status(200).json(tasks);

    } catch (error) {
      console.error('Error retrieving "could do" tasks:', error);
      res.status(500).json({ message: 'Error retrieving "could do" tasks' });
    }
  });
  

router.get('/tasks/should', isAuthenticated, async (req: Request, res: Response) => {
    try {
      const userId = req.session?.user?.userID;
      const tasks = await Task.find({ task_author: userId, task_priority: 'should' });

      res.status(200).json(tasks);

    } catch (error) {
      console.error('Error retrieving "should do" tasks:', error);
      res.status(500).json({ message: 'Error retrieving "should do" tasks' });
    }
  });
  

router.get('/tasks/must', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const userId = req.session?.user?.userID;
        const tasks = await Task.find({ task_author: userId, task_priority: 'must' });
       
        res.status(200).json(tasks);

    } catch (error) {
      console.error('Error retrieving "must do" tasks:', error);
      res.status(500).json({ message: 'Error retrieving "must do" tasks' });
    }
  });




  router.get("/holidays", async (req: Request, res: Response) => {
    try {
        const holidays: IHolidays[] = await Holidays.find();

        if (holidays.length === 0) {
            res.status(404).json({ Message: "Holidays not available" });
        } else {
            res.json({ data: holidays });
        }
    } catch (error) {
        console.error("Error fetching data from the database", error);
        res.status(500).json({ Message: "Internal Server Error" });
    }
});


export default router;