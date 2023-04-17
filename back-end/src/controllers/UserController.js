"use strict";

const User = require("../models/User");
const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
var uuidv1 = require("uuidv1");
const sendAuthMail = require("./AuthMailController");
const MOMENT = require("moment");
module.exports = {
  // ĐĂNG KÝ
  signUpCustomer: async (req, result) => {
    let avatar = null;
    if (req.file) {
      avatar = req.file.filename;
    }
    const data = JSON.parse(req.body.data);

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);

    let dateTimeNow = new Date();
    let authen_token = uuidv1();

    let auth_data = {
      auth_token: authen_token,
      user_name: data.user_name,
      created_date: dateTimeNow,
    };

    let notifications = [];

    const user = {
      user_name: data.user_name,
      password: password,
      avatar: avatar,
      email: data.email,
      isAuth: false,
      type_user_id: "normal-customer",
      created_date: new Date(),
    };

    const customer = {
      user_name: data.user_name,
      fullname: data.fullname,
      phone_number: data.phone_number,
      city_id: data.user_city.code,
      district_id: data.user_district.code,
      ward_id: data.user_ward.code,
      address: data.address,
    };

    console.log(customer);

    User.getUserConfirmed(user, (err, res) => {
      if (res.length > 0) {
        notifications.push("USER_EXISTS");
      }

      User.getUserByMail(user, (err, res) => {
        if (res.length > 0) {
          notifications.push("EMAIL_EXISTS");
        }

        if (notifications.length > 0) {
          return result.send(notifications);
        } else {
          User.deleteUser(user, (err, res) => {
            if (!err) {
              User.setUser(user, (err, res) => {
                if (err) {
                  return result.status(400).json(err);
                } else {
                  User.setCustomer(customer, (err, res) => {
                    if (err) {
                      return result.status(400).json(err);
                    } else {
                      Auth.setToken(auth_data, (err, res) => {
                        if (!err) {
                          sendAuthMail(data.email, authen_token)
                            .then((val) => {
                              console.log("Gửi mail thành công");
                            })
                            .catch((err) => {
                              return result.status(400).json(err);
                            });
                        } else {
                          return result.status(400).json(err);
                        }
                      });

                      notifications.push("SIGNUP_SUCCESS");

                      return result.send(notifications);
                    }
                  });
                }
              });
            } else {
              return result.status(400).json(err);
            }
          });
        }
      });
    });
  },
  // ĐĂNG NHẬP
  login: async (req, result) => {
    const data = req.body;
    const salt = await bcrypt.genSalt(10);

    User.getUser(data, (err, res) => {
      if (res.length) {
        User.getUserConfirmed(data, async (err, res) => {
          if (err) throw err;
          if (res.length) {
            const validPassword = await bcrypt.compare(
              data.password,
              res[0].password
            );

            if (validPassword) {
              return result.send(res[0]);
            } else {
              return result.status(200).json("FAILED_LOGIN");
            }
          } else {
            return result.status(200).json("USER_NOT_CONFIRMED");
          }
        });
      } else {
        return result.status(200).json("FAILED_LOGIN");
      }
    });
  },
};
