const express=require("express")
const {getUserDetailsController}=require("./controller")

const userRouter=express.Router();

userRouter.get("/",getUserDetailsController);

module.exports={userRouter};