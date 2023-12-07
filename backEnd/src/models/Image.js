const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  src: String,
  name: String,
  description: String, // Additional field for image description
  createdBy: { type: String, required: true }, // User who created the image
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Image", imageSchema);
