const express = require("express");
const checkEnvs = require("./config/envCheck");
checkEnvs();
const dbConnect = require("./config/db");
const morgan = require("morgan");

const app = express();

const cors = require("cors");

dbConnect();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(morgan("short"));

app.get("/health", (req, res) => {
  return res.status(200).send({ message: "application is running" });
});
const _port = process.env.PORT || 3002;

app.listen(_port, () => {
  console.log(`App is listening at ${_port}`);
});
