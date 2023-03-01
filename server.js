const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const router = require("./src/routes/router");

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOST;

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://${HOSTNAME}:${PORT}`);
});
