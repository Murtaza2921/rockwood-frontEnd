const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const imageRoutes = require("./routes/imageRoutes");
const errorHandler = require("./utils/errorHandler");
const config = require("./config");
const cors = require("cors");
const app = express();

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
// Increase payload size limit to 10MB
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());

app.use("/api/images", imageRoutes);

app.use(errorHandler);

module.exports = app;
