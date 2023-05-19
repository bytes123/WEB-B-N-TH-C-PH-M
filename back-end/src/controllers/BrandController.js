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
  addBrand: (req, result) => {
    const data = req.body;

    data.createdAt = new Date();
    let notifications = [];

    Brand.getBrandExists(data, (err, res) => {
      if (res.length) {
        notifications.push("BRAND_EXISTS");
      }
      Brand.getPhoneNumberExists(data, (err, res) => {
        if (res.length) {
          notifications.push("PHONENUMBER_EXISTS");
        }
        Brand.getMailExists(data, (err, res) => {
          if (res.length) {
            notifications.push("EMAIL_EXISTS");
          }

          if (notifications.length) {
            return result.status(200).json(notifications);
          } else {
            Brand.addBrand(data, (err, res) => {
              if (err) {
                return result.status(400).json(err);
              } else {
                return result.status(200).json("ADD_SUCCESS");
              }
            });
          }
        });
      });
    });
  },
  updateBrand: (req, result) => {
    const { brand, current_id } = req.body;

    brand.updatedAt = new Date();
    let notifications = [];

    Brand.getBrandExists(brand, (err, res) => {
      if (res?.length) {
        notifications.push("BRAND_EXISTS");
      }

      Brand.getPhoneNumberExists(brand, (err, res) => {
        if (res?.length) {
          notifications.push("PHONENUMBER_EXISTS");
        }

        Brand.getMailExists(brand, (err, res) => {
          if (res?.length) {
            notifications.push("EMAIL_EXISTS");
          }

          if (notifications.length) {
            return result.status(200).json(notifications);
          } else {
            Brand.updateBrand(
              {
                brand: brand,
                current_id: current_id,
              },
              (err, res) => {
                if (err) {
                  return result.status(500).json(err);
                } else {
                  return result.status(200).json("UPDATE_SUCCESS");
                }
              }
            );
          }
        });
      });
    });
  },
  deleteBrand: (req, result) => {
    const data = req.body;

    Brand.deleteBrand(data, async (err, res) => {
      if (!err) {
        return result.status(200).json("SUCCESS_DELETE");
      } else {
        console.log(err);
        return result.status(400).json("FAILED_DELETE");
      }
    });
  },
  searchBrand: (req, result) => {
    const data = req.body;

    Brand.searchBrand(data, (err, brands) => {
      if (err) throw err;
      return result.status(200).json(brands);
    });
  },
};
