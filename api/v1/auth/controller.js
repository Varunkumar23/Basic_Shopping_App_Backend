const bcrypt = require("bcrypt");
const { userModel } = require("./user_schema");
const jwt = require("jsonwebtoken");

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

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  const data = req.body;
  if (!data.email || !data.password) {
    res.status(400).json({
      isSuccess: false,
      message: "Email and password are required",
      data: {},
    });
    return;
  }

  const user = await userModel.findOne({
    email,
  });

  if (user == null) {
    res.status(400).json({
      isSuccess: false,
      message: "User does not exist, please register!",
      data: {},
    });
    return;
  }
  const hashedPassword = user.password;
  const isCorrect = await bcrypt.compare(password, hashedPassword);

  if (!isCorrect) {
    res.status(400).json({
      isSuccess: false,
      message: "Password is Incorrect",
      data: {},
    });
    return;
  } else {
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.cookie("authorization", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      isSuccess: true,
      message: "Login Successfull",
      data: {
        user: {
          email: user.email,
        },
      },
    });
  }
};

module.exports = { userRegistrationController, userLoginController };
