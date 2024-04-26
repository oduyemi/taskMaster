import mongoose, { Schema, Document } from "mongoose";



export interface ITaskCategory extends Document {
  _id: mongoose.Types.ObjectId; 
  task_category: string;
}

const taskCategorySchema: Schema = new mongoose.Schema({
  task_category: {
    type: String,
    required: true,
  },

});

const TaskCategory = mongoose.model<ITaskCategory>("TaskCategory", taskCategorySchema);

export default TaskCategory;