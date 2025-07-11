const express = require("express");
const{ userRegistrationController,userLoginController }=require("./controller");
const authRouter = express.Router();

authRouter.post("/signup", userRegistrationController);
authRouter.post("/login", userLoginController);

module.exports = { authRouter };
