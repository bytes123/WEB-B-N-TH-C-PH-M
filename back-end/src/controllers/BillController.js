"use strict";

const Bill = require("../models/Bill");

var fs = require("fs");
const { json } = require("express");

module.exports = {
  getBill: (req, result) => {
    Bill.getBill((err, res) => {
      if (err) return result.status(500).json(err);
      return result.status(200).json(res);
    });
  },
  updateStatementBill: (req, result) => {
    const data = req.body;

    Bill.updateStatementBill(data, (err, res) => {
      if (err) return result.status(500).json(err);
      console.log("Thành công");
      return result.status(200).json(data.bill_statement);
    });
  },
};
