import mongoose, { Schema, Document } from "mongoose";



export interface IList extends Document {
    _id: mongoose.Types.ObjectId; 
    title: string;
    description: string;
    task_author: mongoose.Types.ObjectId; 
    tasks: mongoose.Types.ObjectId[]; 
  }
  
  const listSchema: Schema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
  
    description: {
      type: String,
      required: true,
    },
  
    task_author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    }]
  });
  

const List = mongoose.model<IList>("List", listSchema);

export default List;