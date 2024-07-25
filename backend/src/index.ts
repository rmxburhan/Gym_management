// import chalk  from "chalk'
import express from "express";
import dotenv from "dotenv";
import attendanceCodeCronJob from "./cron_job/attendanceCode";
import connectMonggose from "./startup/db";
import startup from "./startup/index";
import routes from "./routes";

dotenv.config();

const app = express();
startup(app);
connectMonggose();
attendanceCodeCronJob();
routes(app);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
