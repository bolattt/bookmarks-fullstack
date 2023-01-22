const db = require("../db/dbConfig");

const getAllReviews = async (bookmark_id) => {
  try {
    const reviews = await db.any(
      "SELECT * FROM reviews WHERE bookmark_id = $1",
      bookmark_id
    );
    return [reviews, undefined];
  } catch (error) {
    console.log(error);
    return [undefined, error];
  }
};

const getOneReview = async (id) => {
  try {
    const review = await db.one("SELECT * FROM reviews WHERE id =$1", id);
    return [review, undefined];
  } catch (error) {
    console.log(error);
    return [undefined, error];
  }
};

const createReview = async (review) => {
  const { reviewer, title, content, rating, bookmark_id } = review;
  try {
    const newReview = await db.one(
      "INSERT INTO reviews(reviewer,title,content,rating,bookmark_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [reviewer, title, content, rating, bookmark_id]
    );
    return [newReview, undefined];
  } catch (error) {
    console.log(error);
    return [undefined, error];
  }
};

const updateReview = async (id, review) => {
  const { reviewer, title, content, rating, bookmark_id } = review;

  try {
    const updatedReview = await db.one(
      "UPDATE reviews SET reviewer = $1, title = $2,content = $3, rating = $4,bookmark_id = $5 WHERE id = $6 RETURNING *",
      [reviewer, title, content, rating, bookmark_id, id]
    );
    return [updatedReview, undefined];
  } catch (error) {
    console.log(error);
    return [undefined, error];
  }
};

const deleteReview = async (id) => {
  try {
    const deletedReview = await db.one(
      "DELETE FROM reviews WHERE id = $1 RETURNING *",
      id
    );
    return [deletedReview, undefined];
  } catch (error) {
    console.log(error);
    return [undefined, error];
  }
};

module.exports = {
  getAllReviews,
  getOneReview,
  createReview,
  updateReview,
  deleteReview,
};
