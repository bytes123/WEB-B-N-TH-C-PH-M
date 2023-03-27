"use strict";
const db = require("./../db");

var Products = {
  getAllProduct: function (callback) {
    let sql = "SELECT * FROM PRODUCTS";
    return db.query(sql, callback);
  },
};

module.exports = Products;
