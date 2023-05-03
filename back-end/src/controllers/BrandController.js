"use strict";

const Brand = require("../models/Brand");

var fs = require("fs");
const { json } = require("express");
module.exports = {
  get: (req, res) => {
    Brand.getAllBrand((err, response) => {
      if (err) throw err;
      res.status(200).json(response);
    });
  },
};
