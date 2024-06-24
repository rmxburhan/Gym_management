const express = require("express");
const dotenv = require("dotenv");
const app = express();
const notFoundHandler = require("./middleware/notFoundHandler")
const connectMonggose = require("./utils/db")
const routeIndex = require("./routes/routesIndex")

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Routes 
app.use("/api", routeIndex);

app.use(notFoundHandler);

connectMonggose();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
})