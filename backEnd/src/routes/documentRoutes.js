const express = require("express");
const router = express.Router();
const {
  createDocument,
  getAllDocument,
  getDocumentById,
  updateById,
  deleteById,
} = require("../controllers/documentController");

router.route("/create").post(createDocument).get(getAllDocument);

router.route("/getAll").get(getAllDocument);
router.route("/:id").get(getDocumentById).put(updateById).delete(deleteById);

module.exports = router;
