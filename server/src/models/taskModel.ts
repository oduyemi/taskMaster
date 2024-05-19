import mongoose, { Schema, Document } from "mongoose";



export interface ITask extends Document {
  _id: mongoose.Types.ObjectId; 
  task_name: string;
  task_priority: "could" | "should" | "must";
  task_author:  mongoose.Types.ObjectId; 
  due_date: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new mongoose.Schema({
  task_name: {
    type: String,
    required: true,
  },

  task_priority: {
    type: String,
    enum: ["could", "should", "must"],
    required: true,
  },

  task_author: {
    type: mongoose.Schema.Types.ObjectId,
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

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
