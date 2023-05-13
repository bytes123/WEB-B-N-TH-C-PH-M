"use strict";
const db = require("./../db");

var Bill = {
  getBill: (callback) => {
    let sql = `SELECT * FROM bills`;

    return db.query(sql, callback);
  },

  updateStatementBill: (data, callback) => {
    let sql = `UPDATE bills SET bill_statement = ? WHERE id = ?`;

    return db.query(sql, [data.bill_statement, data.id], callback);
  },
};

module.exports = Bill;
