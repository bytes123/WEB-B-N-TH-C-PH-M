"use strict";

const Category = require("../models/Category");

var fs = require("fs");
const { json } = require("express");

module.exports = {
  get: (req, res) => {
    Category.getAllCategory((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
  addCategory: (req, result) => {
    const data = req.body;
    data.created_date = new Date();

    Category.getCategoryExists(data, (err, res) => {
      if (!res.length) {
        Category.addCategory(data, (err, res) => {
          if (err) {
            return result.status(400).json(err);
          } else {
            return result.status(200).json("ADD_SUCCESS");
          }
        });
      } else {
        return result.status(200).json("CATEGORY_EXISTS");
      }
    });
  },
  updateCategory: (req, result) => {
    const data = req.body;
    data.modify_date = new Date();

    const category = {
      name: data.name,
      modify_date: new Date(),
    };

    Category.getCategoryExists(data, (err, res) => {
      if (!res.length) {
        Category.updateCategory(
          {
            category: category,
            current_id: data.current_id,
          },
          (err, res) => {
            if (err) {
              return result.status(400).json(err);
            } else {
              return result.status(200).json("UPDATE_SUCCESS");
            }
          }
        );
      } else {
        return result.status(200).json("CATEGORY_EXISTS");
      }
    });
  },
  deleteCategory: (req, result) => {
    const data = req.body;

    Category.deleteCategory(data, async (err, res) => {
      if (!err) {
        return result.status(200).json("SUCCESS_DELETE");
      } else {
        console.log(err);
        return result.status(400).json("FAILED_DELETE");
      }
    });
  },
};
