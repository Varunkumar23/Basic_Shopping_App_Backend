const dotEnv = require("dotenv");
dotEnv.config();
const express = require("express");
const { apiRouter } = require("./api/v1/routes.js");
const cors=require("cors");

const app = express();

require("./config/db.js");

// app.use(cors(""));  //this is used to give the access to the front end

app.use(cors({
  origin: [
    "https://basic-shopping-app-frontend.vercel.app",
    "http://localhost:5173"
  ],
  new:true,
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log("--------------");
  console.log(new Date(), req.method, req.url);
  console.log("--------------");
  next();
});

app.use("/api/v1", apiRouter);

app.listen("2900", () => {
  console.log("<====== Server is Running ======>");
});

module.exports = app;
