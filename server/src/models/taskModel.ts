import mongoose, { Schema, Document } from "mongoose";



export interface ITask extends Document {
  _id: mongoose.Types.ObjectId; 
  title: string;
  description: string;
  task_category_id: mongoose.Types.ObjectId; 
  task_author:  mongoose.Types.ObjectId; 
  due_date: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  task_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskCategory",
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