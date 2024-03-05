const express = require("express");
const {
  handleCreateNewUser,
  handleLoginUser,
  getUserProfile,
  handleLogoutUser,
  getUserBookings,
} = require("../controllers/user");

const router = express.Router();

router.route("/register").post(handleCreateNewUser);
router.route("/login").post(handleLoginUser);
router.route("/logout").post(handleLogoutUser);
router.route("/getUserProfile").get(getUserProfile);
router.route("/bookings").get(getUserBookings);
module.exports = router;
