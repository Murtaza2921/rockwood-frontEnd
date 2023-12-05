const Image = require("../models/Image");

const uploadImage = async (req, res) => {
  try {
    console.log(req.body);

    // Assuming req.body has an 'images' property
    const { images } = req.body;

    // Assuming 'images' is an array of objects with 'src' and 'name'
    for (const { src, name } of images) {
      const newImage = new Image({ src, name });
      // Save each image to the database
      await newImage.save();
    }

    res.json({ message: "Images uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
};
