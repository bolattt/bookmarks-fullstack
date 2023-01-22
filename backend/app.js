const express = require("express");
const app = express();
const cors = require("cors");
const bookmarksController = require("./controllers/bookmarkController");

//middleware
app.use(cors());
app.use(express.json());

app.use("/bookmarks", bookmarksController);

app.get("/", (req, res) => {
  res.send("Welcome to the bookmarks app");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = app;
