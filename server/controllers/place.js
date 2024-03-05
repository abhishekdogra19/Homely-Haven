const fs = require("fs");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const statusCode = require("http-status-codes");
const path = require("path");
const PlaceModel = require("../models/Place");
const { URLSearchParams } = require("url");
const BookingModel = require("../models/Booking");
const handleUploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = "photo-" + Date.now() + ".jpg";
  try {
    await imageDownloader.image({
      url: link,
      dest: path.join(__dirname, "../uploads/", newName),
    });
    res.status(200).json(newName);
  } catch (err) {
    console.log("Error in uploadByLink", err);
  }
};
const handleUploadByDevice = async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { filename } = req.files[i];
    uploadedFiles.push(filename);
  }
  res.json(uploadedFiles);
};
const handleAddPlace = async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    description,
    checkIn,
    checkOut,
    extraInfo,
    maxGuests,
    perks,
    addedPhotos,
    price,
  } = req.body;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("User", user);
    try {
      await PlaceModel.create({
        owner: user.id,
        title,
        address,
        description,
        checkIn,
        checkOut,
        extraInfo,
        maxGuests,
        perks,
        photos: addedPhotos,
        price,
      });
    } catch (error) {
      console.log("handleAddPlace Error ", error);
    }
  }
  res.json({ success: "ok" });
};
const handleGetAllUserPlaces = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const response = await PlaceModel.find({ owner: user.id });
    res.status(200).json(response);
  }
};
const handleGetPlace = async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const response = await PlaceModel.findById({ owner: user.id, _id: id });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ msg: error });
    }
  }
  return res.status(500).json({ success: "ok" });
};
const handleEditPlace = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const { id } = req.body;
      const response = await PlaceModel.findOneAndUpdate(
        {
          owner: user.id,
          _id: id,
        },
        req.body
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ msg: error });
    }
  }
  return res.status(500).json({ success: "ok" });
};
const handleGetAllPlaces = async (req, res) => {
  try {
    const response = await PlaceModel.find({});
    res.status(200).json(response);
  } catch (error) {
    console.log("Error in handleGetAllPlaces ", error);
    throw error;
  }
};
const handleGetPlaceByID = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await PlaceModel.find({ _id: id });
    res.status(200).json(response);
  } catch (error) {
    console.log("Error in handleGetPlaceByID ", error);
    throw error;
  }
};
const handlePlaceBooking = async (req, res) => {
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const response = await BookingModel.create({
        place,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price,
        user: user.id,
      });
      res.status(200).json(response);
    } catch (error) {
      console.log("Error in handlePlacebooking ", error);
      throw error;
    }
  }
};
module.exports = {
  handleUploadByLink,
  handleUploadByDevice,
  handleAddPlace,
  handleGetAllUserPlaces,
  handleGetPlace,
  handleEditPlace,
  handleGetAllPlaces,
  handleGetPlaceByID,
  handlePlaceBooking,
};
