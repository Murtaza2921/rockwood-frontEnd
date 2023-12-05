const express = require("express");
const imageController = require("../controllers/imageController");

const router = express.Router();

router.post("/upload", imageController.uploadImage);
router.get("/all", imageController.getAllImages);

module.exports = router;
