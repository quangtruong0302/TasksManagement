const express = require("express");
const app = express();
require("dotenv").config();
const database = require("./config/database");
const Task = require("./api/v1/models/task.model");

database.connect();

const RouterV1 = require("./api/v1/routes/index.route");
RouterV1(app);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
