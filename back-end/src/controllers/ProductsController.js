"use strict";

const Products = require("../models/Products");
const DetailProduct = require("../models/DetailProduct");

var fs = require("fs");
const { json } = require("express");
var filePath = "public/resources/product/";

module.exports = {
  get: (req, res) => {
    Products.getAllProduct((err, response) => {
      if (err) throw err;
      res.status(200).json(response);
    });
  },
  getTopProducts: (req, result) => {
    const { type, quantity } = req.body;

    if (type == "newest") {
      DetailProduct.getTopProducts(quantity, (err, response) => {
        if (err) result.status(500).json(err);
        if (result) {
          result.status(200).json(response);
        }
      });
    }
  },
  addProduct: (req, result) => {
    const images = req.files;

    const data = JSON.parse(req.body.data);

    if (images.length) {
      data.image1 = images[0]?.filename;
      data.image2 = images[1]?.filename;
      data.image3 = images[2]?.filename;
    }

    !data.image1 && delete data.image1;
    !data.image2 && delete data.image2;
    !data.image3 && delete data.image3;

    data.createdAt = new Date();

    Products.addProduct(data, (err, res) => {
      if (err) {
        console.log(err);
        result.status(400).json("ADD_FAILED");
      } else {
        console.log("thành công");
        result.status(200).json("ADD_SUCCESS");
      }
    });
  },
  updateProduct: (req, result) => {
    const images = req?.body.new_images;

    const data = JSON.parse(req.body.data);

    if (images?.length) {
      data.image1 = images[0];
      data.image2 = images[1];
      data.image3 = images[2];
    }
    if (data.image1 == "") {
      delete data.image1;
    }
    if (data.image2 == "") {
      delete data.image2;
    }
    if (data.image3 == "") {
      delete data.image3;
    }

    data.old_images = [];

    if (data?.old_images.length) {
      console.log(data.old_images);
      data?.old_images
        .filter((item) => item.isDelete)
        .map((item) => item.file_name);
    }

    const id = data.id;
    data?.old_images.length &&
      data.old_images.forEach((item) => {
        if (item !== "default.jpg" || item !== null) {
          fs.stat(filePath + `/${id}/${item}`, function (err, stats) {
            if (err) return console.log(err);
            console.log(1);
            fs.unlink(filePath + `/${id}/${item}`, function (err) {
              if (err) return console.log(err);
            });
          });
        }
      });

    data.updatedAt = new Date();

    delete data.id;
    delete data.old_images;

    Products.updateProduct(
      {
        data: data,
        id: id,
      },
      (err, res) => {
        if (err) {
          console.log(err);
          result.status(400).json("UPDATE_FAILED");
        } else {
          console.log("thành công");
          result.status(200).json("UPDATE_SUCCESS");
        }
      }
    );
  },
  deleteProduct: (req, result) => {
    const id = req.body.id;

    fs.stat(filePath + `/${id}`, function (err, stats) {
      if (stats) {
        fs.rmSync(filePath + `/${id}`, { recursive: true, force: true });
      }
    });

    Products.deleteProduct(id, (err, res) => {
      if (err) {
        console.log(err);
        result.status(400).json("DELETE_FAILED");
      } else {
        console.log("thành công");
        result.status(200).json("DELETE_SUCCESS");
      }
    });
  },
  searchProduct: (req, result) => {
    const data = req.body;
    Products.searchProduct(data, (err, products) => {
      if (err) throw err;
      return result.status(200).json(products);
    });
  },
};
