"use strict";

const Products = require("../models/Products");

var fs = require("fs");
const { json } = require("express");
var filePath = "public/resource/ProductImages/";

module.exports = {
  get: (req, res) => {
    Products.getAllProduct((err, response) => {
      if (err) throw err;
      res.json(response);
    });
  },
};
