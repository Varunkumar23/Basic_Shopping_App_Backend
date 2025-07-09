const express=require("express")

const app=express();

app.use(express.json());

app.use((req,res,next)=>{
    console.log("--------------");
    console.log(req.url);
    console.log(req.method);
    console.log("--------------");
    next();
})

app.get("/",(req,res)=>{
    res.json({
        isSuccess:true,
        message:"Server is Running",
        data:{},
    })
})

app.get("/hello",(req,res)=>{
    res.json({
        isSuccess:true,
        message:"Hi! How are you?",
        data:{},
    })
})


app.use((req,res,next)=>{
    console.log("!!!!!!!!!!!!!!!!");
    res.json({
        isSuccess:false,
        message:"Routes does not match. Please check your code!😊",
    })
    next();
    next();
})

app.listen("2900",()=>{
    console.log("<====== Server is Running ======>")
})