"use strict";
const db = require("./../db");

var Products = {
  getAllProduct: function (callback) {
    let sql = "SELECT * FROM PRODUCTS";
    return db.query(sql, callback);
  },
  getProductsByCategory: (data, callback) => {
    let sql = "SELECT * FROM products WHERE category_id = ?";
    return db.query(sql, [data.id], callback);
  },
};

module.exports = Products;
