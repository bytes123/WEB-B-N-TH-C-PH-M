"use strict";

const User = require("../models/User");
const bcrypt = require("bcrypt");
var uuidv1 = require("uuidv1");
const Auth = require("../models/Auth");
const sendForgetPasswordCode = require("../Mailer/ForgotPasswordMail");
function generateCode() {
  // Generate a random number between 100000 and 999999
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  return randomNumber;
}

module.exports = {
  authen: async (req, result) => {
    const data = req.body;

    Auth.deleteTokenExpired((err, res) => {
      if (err) throw err;
      Auth.getToken(data, (err, res) => {
        if (err) throw err;
        if (res.length) {
          Auth.authUser(data, (err, res) => {
            if (!err) {
              Auth.deleteToken(data, (err, res) => {
                if (!err) {
                  return result.status(200).json("Xác thực thành công");
                } else {
                  return result.status(400).json("Xác thực token thất bại");
                }
              });
            } else {
              return result.status(400).json("Xác thực token thất bại");
            }
          });
        } else {
          return result.status(400).json("Xác thực token thất bại");
        }
      });
    });
  },
  sendForgotCode: (req, result) => {
    const data = req.body;

    const code = generateCode();
    data.createdAt = new Date();
    data.code = code;

    User.getUserByMail(data, (err, user) => {
      if (user.length) {
        Auth.deleteForgotCode(data, (err, res) => {
          if (err) return res.status(500).json(err);
          Auth.addForgotCode(data, (err, res) => {
            if (err) return res.status(500).json(err);
            sendForgetPasswordCode(data.email, data.code)
              .then((val) => {
                console.log("Gửi mail thành công");
                return result.status(200).json("SUCCESS");
              })
              .catch((err) => {
                console.log(err);
                return result.status(400).json(err);
              });
          });
        });
      } else {
        return result.status(200).json("EMAIL_NOT_EXISTS");
      }
    });
  },
  authForgotCode: (req, result) => {
    const data = req.body;
    console.log(data);
    Auth.getForgotCode(data, (err, res) => {
      if (err) return res.status(500).json(err);
      console.log(res);
      if (res.length) {
        return result.status(200).json("SUCCESS");
      } else {
        return result.status(200).json("WRONG_CODE");
      }
    });
  },
};
