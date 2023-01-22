const express = require("express");
const reviewsController = require("./reviewsController.js");
const bookmarks = express.Router();
const {
  getAllBookmarks,
  getOneBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
} = require("../queries/bookmarks");

bookmarks.use("/:bookmarkId/reviews", reviewsController);

bookmarks.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  res.json(allBookmarks);
});

bookmarks.get("/:id", async (req, res) => {
  console.log(req.protocol);

  const { id } = req.params;
  // const bookmark = await getOneBookmark(id);
  // console.log("in controller", bookmark);
  // if (bookmark) {
  //   res.json(bookmark);
  // } else {
  //   res.status(404).json({ error: "bookmark not found" });
  // }

  try {
    const bookmark = await getOneBookmark(id);
    res.json(bookmark);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

bookmarks.post("/", async (req, res) => {
  console.log(req.body);
  const createdBookmark = await createBookmark(req.body);
  if (createdBookmark) {
    res.status(200).json(createdBookmark);
  } else {
    res.status(400).json({ error: "something went wrong" });
  }
});

bookmarks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBookmark = await deleteBookmark(id);
  if (deletedBookmark) {
    res.status(200).json({ deletedBookmark });
  } else {
    res.status(400).json({ error: "something went wrong" });
  }
});

bookmarks.put("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const updatedBookmark = await updateBookmark(id, req.body);
    res.json(updatedBookmark);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "cannot update" });
  }
});

module.exports = bookmarks;
