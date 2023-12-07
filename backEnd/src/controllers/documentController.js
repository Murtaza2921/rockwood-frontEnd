const express = require("express");
const router = express.Router();
const Document = require("../models/document");

// Create a new document
const createDocument = async (req, res) => {
  try {
    const { type, content, attachments, uploadedBy, name } = req.body;
    const newDocument = new Document({
      type,
      content,
      attachments,
      uploadedBy,
      name,
    });
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all documents
const getAllDocument = async (req, res) => {
  try {
    const documents = await Document.find({ isDeleted: false });
    res.json(documents);
  } catch (error) {
    console.error("Error getting documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific document by ID  router.get("/documents/:id",
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(document);
  } catch (error) {
    console.error("Error getting document by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a document by ID router.put("/documents/:id"
const updateById = async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(updatedDocument);
  } catch (error) {
    console.error("Error updating document by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a document by ID router.delete("/documents/:id",
const deleteById = async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedDocument) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(deletedDocument);
  } catch (error) {
    console.error("Error deleting document by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  deleteById,
  updateById,
  getDocumentById,
  getAllDocument,
  createDocument,
};
