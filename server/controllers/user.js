const UserModel = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const BookingModel = require("../models/Booking.js");
const handleCreateNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.create({
      name,
      email,
      password,
    });
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    return next(error);
  }
};

const handleLoginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials");
  }
  const token = user.createJWT();
  //! Left here going outside to pick my sis and also to have some fresh air
  res.cookie("token", token, {
    expires: new Date(Date.now() + 604800000),
  });
  res.status(StatusCodes.OK).json({
    user: { name: user.name, email: user.email, id: user._id },
    token,
  });
};

const getUserProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return res.json(user);
  }
  return res.json(null);
};

const handleLogoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Cooke Removed" });
};
const getUserBookings = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const response = await BookingModel.find({ user: user.id }).populate(
        "place"
      );
      return res.status(200).json(response);
    } catch (error) {
      console.log("Error in get USer bookings ", error);
      throw error;
    }
  }
  res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Need to Login" });
};
module.exports = {
  handleCreateNewUser,
  handleLoginUser,
  getUserProfile,
  handleLogoutUser,
  getUserBookings,
};
