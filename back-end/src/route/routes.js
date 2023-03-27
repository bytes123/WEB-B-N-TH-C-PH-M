"use strict";

var fs = require("fs");
const multer = require("multer");

let storageProduct = multer.diskStorage({
  destination: function (req, file, callback) {
    let dir = `../src/public/resource/ProductImages/`;

    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

let storageBrand = multer.diskStorage({
  destination: function (req, file, callback) {
    let dir = `../src/public/resource/BrandImages/`;

    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

let uploadProduct = multer({ storage: storageProduct });
let uploadBrand = multer({ storage: storageBrand });

module.exports = function (app) {
  let productsCtrl = require("../controllers/ProductsController");

  // API SẢN PHẨM
  app.route("/products").get(productsCtrl.get);
};
