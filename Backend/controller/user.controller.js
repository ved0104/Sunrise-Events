const User = require("../models/user.model.js");

//registeruser
module.exports.registerUser = async (req, res) => {
  console.log("signup controller");

  const { username, email, password } = req.body;

  const user = User.findOne({ email });
  console.log(user);
  if (user) {
    return res.status(400).json({ message: "user already exist" });
  }

  console.log(password);
  const hashedPassword = await User.hashPassword(password);
  console.log(hashedPassword);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  newUser.save();
};

//user login
module.exports.loginUser = async (req, res) => {
  console.log("login controller");
  let { email, password } = req.body;

  const user = User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const isMatch = await user.comparePassword(password);
  console.log(isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const token = await user.generateAuthToken();
  res.cookie("token", token);
  console.log("login succesfull");
  res.status(200).json({ token, user });
};
