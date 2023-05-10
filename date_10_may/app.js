require("dotenv").config();

console.log();
const express = require("express");
const app = express();
const db = require("./connections/db");
const router = require("./routes/index");
const fileUpload = require("express-fileupload");
const morgan=require("morgan")
app.use(morgan("dev"))
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(router);
const port = process.env.PORT;

app.listen(port, () => console.log(`running at http://localhost:${port} `));
