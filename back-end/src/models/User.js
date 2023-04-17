"use strict";
const db = require("./../db");

var User = {
  getUser: (data, callback) => {
    let sql = "SELECT * FROM users WHERE user_name = ? ";
    return db.query(sql, [data.user_name], callback);
  },
  getUserConfirmed: (data, callback) => {
    let sql =
      "SELECT * FROM users as u INNER JOIN customers as c WHERE u.user_name = ? AND u.isAuth = 1 AND u.user_name = c.user_name";
    return db.query(sql, [data.user_name], callback);
  },
  getUserByMail: (data, callback) => {
    let sql = "SELECT * FROM users WHERE email = ? AND isAuth = 1";
    return db.query(sql, [data.email], callback);
  },
  getUserAuth: (data, callback) => {
    let sql =
      "SELECT * FROM users WHERE user_name = ? AND email = ? AND isAuth = 1";
    return db.query(sql, [data.user_name, data.email], callback);
  },
  getUserNotAuth: (data, callback) => {
    let sql =
      "SELECT * FROM users WHERE user_name = ? OR  email = ? AND isAuth = 0";
    return db.query(sql, [data.user_name, data.email], callback);
  },
  deleteUser: (data, callback) => {
    let sql =
      "DELETE FROM users WHERE user_name = ? OR email = ? AND isAuth = 0;";
    db.query(sql, [data.user_name, data.email], callback);
  },
  setUser: (data, callback) => {
    let sql = "INSERT INTO users SET ?;";
    db.query(sql, [data], callback);
  },
  setCustomer: (data, callback) => {
    let sql = "INSERT INTO customers SET ?;";
    db.query(sql, [data], callback);
  },
};

module.exports = User;
