const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  src: String,
  name: String,
});

module.exports = mongoose.model("Image", imageSchema);
