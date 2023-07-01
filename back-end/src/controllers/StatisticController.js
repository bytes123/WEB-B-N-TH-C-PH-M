"use strict";

const Statistic = require("../models/Statistic");

module.exports = {
  getRevenueByDuration: async (req, result) => {
    const data = req.body;

    Statistic.getRevenueByDuration(data.year, (err, res) => {
      if (err) return result.status(500).json(err);
      return result.status(200).json(res.map((item) => item.total_revenue));
    });
  },

  getRevenueByMonth: async (req, result) => {
    const data = req.body;

    Statistic.getRevenueByMonth(data.year, (err, res) => {
      if (err) return result.status(500).json(err);
      return result.status(200).json(res.map((item) => item.total_revenue));
    });
  },

  getTopProductsByYear: async (req, result) => {
    const data = req.body;

    Statistic.getTopProductsByYear(data.year, (err, res) => {
      if (err) return result.status(500).json(err);
      return result.status(200).json(res);
    });
  },
};
