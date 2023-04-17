"use strict";

var fs = require("fs");
const multer = require("multer");

let storageAvatar = multer.diskStorage({
  destination: function (req, file, callback) {
    let dir = `./public/resources/avatar/`;

    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

let uploadAvatar = multer({ storage: storageAvatar });

module.exports = function (app) {
  let productsCtrl = require("../controllers/ProductsController");
  let userCrtl = require("../controllers/UserController");
  let authCrtl = require("../controllers/AuthController");
  let messagesCtrl = require("../controllers/MessageController");

  // API SẢN PHẨM
  app.route("/products").get(productsCtrl.get);

  //API ĐĂNG KÝ
  app
    .route("/signup")
    .post(uploadAvatar.single("avatar"), userCrtl.signUpCustomer);
  app.route("/login").post(userCrtl.login);

  app.route("/authen").post(authCrtl.authen);

  // API TIN NHẮN
  app.route("/messages_by_room").post(messagesCtrl.getMsgByRoom);
  app.route("/message_list_by_user").post(messagesCtrl.getMsgListByUser);
  app.route("/message_list_all").get(messagesCtrl.getMsgList);
  app.route("/contact_user").post(messagesCtrl.getContactUser);
  app.route("/send_message").post(messagesCtrl.insertMessage);
  app.route("/customer_room").post(messagesCtrl.insertRoom);
  app.route("/drop_room").post(messagesCtrl.dropRoom);
};
