import mongoose from "mongoose";
import dotenv from "dotenv";
import Holidays from "./models/holidaysModel";

dotenv.config();

const holidays = [
  { name: "New Year's Day", date: "January 1" },
  { name: "Armed Forces Remembrance Day", date: "January 15" },
  { name: "Good Friday", date: "April 5" },
  { name: "Easter Monday", date: "April 8" },
  { name: "Workers Day", date: "May 1" },
  { name: "World Press Freedom Day", date: "May 3" },
  { name: "World Environment Day", date: "June 5" },
  { name: "Democracy Day", date: "June 12" },
  { name: "Eid al-Fitr (End of Ramadan)", date: "Date varies based on lunar calendar" },
  { name: "Independence Day", date: "October 1" },
  { name: "World Food Day", date: "October 16" },
  { name: "Eid al-Adha (Feast of Sacrifice)", date: "Date varies based on lunar calendar" },
  { name: "United Nation's Day", date: "October 24" },
  { name: "Christmas Day", date: "December 25" },
  { name: "Boxing Day", date: "December 26" }
];

const seedDatabase = async () => {
  const url: string = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskmaster";
  await mongoose.connect(url);

  try {
    await Holidays.deleteMany({});
    await Holidays.insertMany(holidays);
    console.log("Holidays created successfully!");
  } catch (e) {
    console.error("Error seeding database:", e);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
