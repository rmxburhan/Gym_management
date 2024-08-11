// import chalk  from "chalk'
import express from "express";
import dotenv from "dotenv";
import attendanceCodeCronJob from "./cron_job/code";
import connectMonggose from "./persistence/db";
import startup from "./startup/index";
import routes from "./routes";

dotenv.config();

const app = express();
startup(app);
connectMonggose();
attendanceCodeCronJob();
routes(app);

export default app;
