const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");

const app = express();
const dotenv = require("dotenv").config();
const PORT = 3000;

const cors = require("cors");

const router = require('./routes/routes');

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/post', router);

dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
