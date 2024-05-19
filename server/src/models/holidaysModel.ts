import mongoose, { Schema, Document } from "mongoose";

export interface IHolidays extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  date: string;
}

const holidaysSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Holidays = mongoose.model<IHolidays>("Holidays", holidaysSchema);

export default Holidays;
