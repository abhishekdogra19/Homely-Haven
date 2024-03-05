const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  handleUploadByLink,
  handleUploadByDevice,
  handleAddPlace,
  handleGetAllUserPlaces,
  handleGetPlace,
  handleEditPlace,
  handleGetAllPlaces,
  handleGetPlaceByID,
  handlePlaceBooking,
} = require("../controllers/place");

const router = express.Router();

router.route("/uploadByLink").post(handleUploadByLink);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: function (req, file, cb) {
    // You can customize the filename as needed
    cb(null, `photo-${Date.now()}-${file.originalname}`);
  },
});

const photoMiddleWare = multer({ storage: storage });

router
  .route("/upload")
  .post(photoMiddleWare.array("photos", 10), handleUploadByDevice);

router.route("/addPlace").post(handleAddPlace).put(handleEditPlace);
router.route("/edit/:id").get(handleGetPlace);
router.route("/getPlaceById/:id").get(handleGetPlaceByID);
router.get("/getAllUserPlaces", handleGetAllUserPlaces);
router.get("/getAllPlaces", handleGetAllPlaces);
router.post("/booking", handlePlaceBooking);
module.exports = router;
