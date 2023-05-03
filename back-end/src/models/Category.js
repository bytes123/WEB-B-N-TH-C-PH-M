"use strict";
const db = require("./../db");

var Category = {
  getAllCategory: function (callback) {
    let sql = "SELECT * FROM category";
    return db.query(sql, callback);
  },
  getCategoryExists: (data, callback) => {
    let sql = "SELECT * FROM category WHERE name = ?";
    return db.query(sql, [data.name], callback);
  },
  addCategory: (data, callback) => {
    let sql = "INSERT INTO category SET ?";

    return db.query(sql, [data], callback);
  },
  updateCategory: (data, callback) => {
    let sql = "UPDATE CATEGORY SET ? WHERE id = ?";

    return db.query(sql, [data.category, data.current_id], callback);
  },
  deleteCategory: (data, callback) => {
    let sql = "DELETE  FROM category WHERE id = ?";

    return db.query(sql, [data.id], callback);
  },
  searchCategory: (data, callback) => {
    let sql = "SELECT * FROM category WHERE name LIKE ?";
    return db.query(sql, [`${data.value}%`], callback);
  },
};

module.exports = Category;
