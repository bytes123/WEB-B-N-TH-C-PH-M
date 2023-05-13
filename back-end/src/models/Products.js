"use strict";
const db = require("./../db");
const { Sequelize } = require("sequelize");
var Products = {
  getAllProduct: function (callback) {
    let sql =
      "SELECT p.*,c.name as category_name,b.name as brand_name FROM PRODUCTS p INNER JOIN categories c ON p.category_id = c.id INNER JOIN brands b ON p.brand_id = b.id  ";
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
      "SELECT p.*,c.name as category_name,b.name as brand_name FROM PRODUCTS p INNER JOIN categories c ON p.category_id = c.id INNER JOIN brands b ON p.brand_id = b.id AND p.name LIKE ?";
    return db.query(sql, [`${data.value}%`], callback);
  },
  Products: () => {
    const products = {
      id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
      },
      image1: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image2: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image3: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    };

    return products;
  },
};

module.exports = Products;
