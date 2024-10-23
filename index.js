const express = require("express");
const app = express();
require("dotenv").config();

const database = require("./config/database");
database.connect();

const cors = require("cors");
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const RouterV1 = require("./api/v1/routes/index.route");
RouterV1(app);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
