"use strict";
const db = require("./../db");

var Brand = {
  getAllBrand: function (callback) {
    let sql = "SELECT * from BRAND";
    return db.query(sql, callback);
  },
};

module.exports = Brand;
