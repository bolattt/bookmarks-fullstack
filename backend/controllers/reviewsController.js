const express = require("express");
const reviews = express.Router({ mergeParams: true });

const {
  getAllReviews,
  getOneReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../queries/reviews");

reviews.get("/", async (req, res) => {
  const { bookmarkId } = req.params;

  const [reviews, error] = await getAllReviews(bookmarkId);
  if (reviews) {
    res.json(reviews);
  } else {
    res.status(400).json({ error: error.name });
  }
});

reviews.post("/", async (req, res) => {
  const review = req.body;
  const [newReview, error] = await createReview(review);
  if (newReview) {
    res.json(newReview);
  } else {
    res.status(400).json({ error: error.name });
  }
});

reviews.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [review, error] = await getOneReview(id);
  if (review) {
    res.json(review);
  } else {
    res.status(400).json({ error: error.name });
  }
});

reviews.put("/:id", async (req, res) => {
  const { id } = req.params;
  const review = req.body;
  console.log(review);
  const [updatedReview, error] = await updateReview(id, review);
  if (updatedReview) {
    res.json(updatedReview);
  } else {
    res.status(400).json({ error });
  }
});

reviews.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const [deletedReview, error] = await deleteReview(id);
  if (deletedReview) {
    res.json(deletedReview);
  } else {
    res.status(400).json({ error: error.name });
  }
});

module.exports = reviews;
