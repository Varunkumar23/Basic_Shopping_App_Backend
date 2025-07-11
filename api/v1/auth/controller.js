const { userModel } = require("./user_schema");
const userRegistrationController = async (req, res) => {
  const data = req.body;

  if (!data.email || !data.password) {
    //we have to add validations like regex check for mail for better purpose
    res.status(400).json({
      isSuccess: false,
      message: "Email & Password are Required!",
      data: {},
    });
    return; //NEVER forgot to write return in such cases!
  }

   try {
    const newUser = await userModel.create(data);
    const { password, ...safeData } = newUser._doc;

    res.status(201).json({
      isSuccess: true,
      message: "User Created",
      data: {
        user: safeData,
      },
    });
  } catch (err) {
    console.log("Error in userRegistrationController", err.message);
    res.status(500).json({
      isSuccess: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const userLoginController=(req,res)=>{
  
}

module.exports = { userRegistrationController,userLoginController };
