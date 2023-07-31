const { CLOUDINARY_OPTIONS } = require("../config");
const cloudinary = require("cloudinary").v2;

cloudinary.config(CLOUDINARY_OPTIONS);

module.exports = cloudinary;
