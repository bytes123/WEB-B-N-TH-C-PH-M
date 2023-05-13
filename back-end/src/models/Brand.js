"use strict";
const db = require("./../db");
const { Sequelize } = require("sequelize");
var Brand = {
  getAllBrand: function (callback) {
    let sql = "SELECT * from brands";
    return db.query(sql, callback);
  },
  Brands: () => {
    const brands = {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(50),
        unique: true,
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

    return brands;
  },
};

module.exports = Brand;
