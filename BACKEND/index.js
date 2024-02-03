const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");

const app = express();
const dotenv = require("dotenv").config();
const PORT = 3000;

const cors = require("cors");

dbConnect();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(PORT, () => {
  console.log(`Server is running  at PORT ${PORT}`);
});