const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'text', 'pdf', 'word'
  content: String, // Text content or file path, depending on the type
  attachments: [String], // Array of attachment file paths
  uploadedBy: { type: String, required: true }, // User who uploaded the document
  isDeleted: { type: Boolean, default: false },
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
