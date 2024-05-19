"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const holidaysModel_1 = __importDefault(require("./models/holidaysModel"));
dotenv_1.default.config();
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
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskmaster";
    yield mongoose_1.default.connect(url);
    try {
        yield holidaysModel_1.default.deleteMany({});
        yield holidaysModel_1.default.insertMany(holidays);
        console.log("Holidays created successfully!");
    }
    catch (e) {
        console.error("Error seeding database:", e);
    }
    finally {
        mongoose_1.default.connection.close();
    }
});
seedDatabase();
