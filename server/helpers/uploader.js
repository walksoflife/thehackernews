const cloudinary = require("./cloudinary");
const DatauriParser = require("datauri/parser");
const path = require("path");

const parser = new DatauriParser();

const uploadToCloudinary = async (file) => {
  try {
    const extName = path.extname(file?.originalname).toString();
    const file64 = parser.format(extName, file.buffer);

    const uploaded = await cloudinary.uploader.upload(file64.content, {
      folder: "blog",
    });

    return uploaded.url;
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadToCloudinary;
