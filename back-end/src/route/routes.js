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

let storageProduct = multer.diskStorage({
  destination: function (req, file, callback) {
    let productId = req.params.productId; // Lấy ID sản phẩm từ request
    let dir = `./public/resources/product/${productId}`; // Tạo đường dẫn tới thư mục theo ID sản phẩm

    if (!fs.existsSync(dir)) {
      // Kiểm tra thư mục có tồn tại không
      fs.mkdirSync(dir); // Nếu không tồn tại thì tạo mới thư mục
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

let uploadProduct = multer({ storage: storageProduct });

module.exports = function (app) {
  let categoryCtrl = require("../controllers/CategoryController");
  let productsCtrl = require("../controllers/ProductsController");
  let userCrtl = require("../controllers/UserController");
  let authCrtl = require("../controllers/AuthController");
  let messagesCtrl = require("../controllers/MessageController");
  let brandCrtl = require("../controllers/BrandController");
  let dbCrtl = require("../controllers/DBController");

  //API PHÂN TÁN
  app.route("/mysql-login").post(dbCrtl.loginDB);
  app.route("/migrate").post(dbCrtl.migrate);

  // API SẢN PHẨM
  app.route("/product").get(productsCtrl.get);
  app
    .route("/add-product/:productId")
    .post(uploadProduct.array("images"), productsCtrl.addProduct);
  app
    .route("/update-product/:productId")
    .post(uploadProduct.array("images"), productsCtrl.updateProduct);
  app.route("/delete-product").post(productsCtrl.deleteProduct);
  app.route("/search-product").post(productsCtrl.searchProduct);

  // API DANH MỤC
  app.route("/category").get(categoryCtrl.get);
  app.route("/add-category").post(categoryCtrl.addCategory);
  app.route("/update-category").post(categoryCtrl.updateCategory);
  app.route("/delete-category").post(categoryCtrl.deleteCategory);
  app.route("/category-children").get(categoryCtrl.getCategoryAndChildren);
  app.route("/search-category").post(categoryCtrl.searchCategory);

  // API NHÀ SX
  app.route("/brand").get(brandCrtl.get);

  // API USER
  app.route("/users").get(userCrtl.getAllUser);
  app.route("/delete-user").post(userCrtl.deleteUser);
  app.route("/admin_type_user").get(userCrtl.getAdminTypeUser);
  app.route("/search-user").post(userCrtl.searchUser);

  //API ĐĂNG KÝ
  app
    .route("/signup")
    .post(uploadAvatar.single("avatar"), userCrtl.signUpCustomer);
  app
    .route("/add-staff")
    .post(uploadAvatar.single("avatar"), userCrtl.signUpStaff);

  app
    .route("/update-staff")
    .post(uploadAvatar.single("avatar"), userCrtl.updateStaff);

  app.route("/login").post(userCrtl.login);
  app.route("/update_online").post(userCrtl.updateOnline);

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
