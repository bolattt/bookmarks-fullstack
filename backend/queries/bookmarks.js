const db = require("../db/dbConfig");

const getAllBookmarks = async () => {
  try {
    const allBookmars = await db.any("SELECT * FROM bookmarks");
    return allBookmars;
  } catch (error) {
    return error;
  }
};

const getOneBookmark = async (id) => {
  // try {
  //   const bookmark = await db.one("SELECT * FROM bookmarks WHERE id=$1", id);
  //   return bookmark;
  // } catch (error) {
  //   console.log(error);
  // }
  const bookmark = await db.one("SELECT * FROM bookmarks WHERE id=$1", id);
  return bookmark;
};

const createBookmark = async (bookmark) => {
  const { name, url, category, is_favorite } = bookmark;
  try {
    const createdBookmark = await db.one(
      "INSERT INTO bookmarks(name,url,category,is_favorite) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, url, category, is_favorite]
    );
    return createdBookmark;
  } catch (error) {
    console.log(error);
  }
};

const deleteBookmark = async (id) => {
  try {
    const deletedBookmark = await db.one(
      "DELETE FROM bookmarks WHERE id=$1 RETURNING *",
      id
    );
    if (deletedBookmark) return deletedBookmark;
  } catch (error) {
    console.log(error);
  }
};

const updateBookmark = async (id, bookmark) => {
  const { name, url, category, is_favorite } = bookmark;
  try {
    const updatedBookmark = await db.one(
      "UPDATE bookmarks SET name=$1, url=$2, category=$3, is_favorite=$4 WHERE id=$5 RETURNING *",
      [name, url, category, is_favorite, id]
    );
    return updatedBookmark;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getAllBookmarks,
  getOneBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
};
