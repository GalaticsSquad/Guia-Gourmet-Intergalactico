const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const fs = require('fs')
// const bcrypt = require("bcrypt");
// const jwtLib = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();



const router = require("./src/routes/router");

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOST;
// const PORT = 3000;
// const HOSTNAME = "localhost";

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://${HOSTNAME}:${PORT}`);
});



/* plainTextPassword = "#cafecompao"
username = "gsquad"

cadastroManual (username, plainTextPassword)

async function cadastroManual(username, plainTextPassword) {
  const passwordHash = await bcrypt.hash(plainTextPassword, 10);
  console.log(passwordHash)
  compare(passwordHash)
}

async function compare(passwordHash) {
  const result = await bcrypt.compare("#cafecompao", passwordHash );
  console.log(result)
}
 */