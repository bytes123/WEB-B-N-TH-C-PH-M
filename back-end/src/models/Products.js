"use strict";
const db = require("./../db");

var Products = {
  getAllProduct: function (callback) {
    let sql =
      "SELECT p.*,c.name as category_name,b.name as brand_name FROM PRODUCTS p INNER JOIN category c ON p.category_id = c.id INNER JOIN brand b ON p.brand_id = b.id  ";
    return db.query(sql, callback);
  },
  getProductsByCategory: (data, callback) => {
    let sql = "SELECT * FROM products WHERE category_id = ?";
    return db.query(sql, [data.id], callback);
  },
  addProduct: (data, callback) => {
    let sql = "INSERT INTO PRODUCTS SET ?";
    return db.query(sql, [data], callback);
  },
  updateProduct: (data, callback) => {
    let sql = "UPDATE PRODUCTS SET ? WHERE id = ?";
    return db.query(sql, [data.data, data.id], callback);
  },
  deleteProduct: (id, callback) => {
    console.log(id);
    let sql = "DELETE FROM PRODUCTS WHERE id = ?";
    return db.query(sql, [id], callback);
  },
  searchProduct: (data, callback) => {
    let sql =
      "SELECT p.*,c.name as category_name,b.name as brand_name FROM PRODUCTS p INNER JOIN category c ON p.category_id = c.id INNER JOIN brand b ON p.brand_id = b.id AND p.name LIKE ?";
    return db.query(sql, [`${data.value}%`], callback);
  },
};

module.exports = Products;
