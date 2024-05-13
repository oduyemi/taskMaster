import express, { Application } from "express";
import bodyParser from "body-parser";
require("dotenv").config();
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import fetchRouter from "./routes/fetch";
import sendRouter from "./routes/send";
import updateRouter from "./routes/update";
import eraseRouter from "./routes/erase";
import db from "./db";

const app: Application = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://taskmaster-zoep.onrender.com"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", fetchRouter);
app.use("/send", sendRouter);
app.use("/update", updateRouter);
app.use("/erase", eraseRouter);

db.on("error", console.error.bind(console, "Mongodb Connection Error:"));

app.use("/api", createProxyMiddleware({
  target: "http://192.168.43.113:3000",
  changeOrigin: true,
}));

app.use(express.static("../src"));

const PORT: number | string = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});



export default app;