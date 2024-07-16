const express = require('express');
const dotenv = require('dotenv');
const app = express();
const notFoundHandler = require('./middleware/notFoundHandler');
const connectMonggose = require('./utils/db');
const routeIndex = require('./routes/routesIndex');
const morgan = require('morgan');
const cors = require('cors');
const attendanceCodeJob = require('./cron_job/attendanceCode');
// const chalk = require("chalk");

dotenv.config();

app.use(express.static('public'));
app.use(cors({ credentials: true }));
// morgan.token("statusColor", (req, res) => {
//   const status = res.statusCode;
//   if (status >= 500) return chalk.red(status);
//   else if (status >= 400) return chalk.yellow(status);
//   else if (status >= 300) return chalk.cyan(status);
//   else if (status >= 200) return chalk.green(status);
//   return chalk.white(status);
// });

// app.use(
//   morgan(":method :url :statusColor :response-time ms - :res[content-length]")
// );
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', routeIndex);

app.use(notFoundHandler);

connectMonggose();
attendanceCodeJob();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
