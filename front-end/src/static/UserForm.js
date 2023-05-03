let userPlaceHolder = {
  avatar: "Ảnh đại diện",
  user_name: "* Tài khoản",
  fullname: "* Họ và tên",
  email: "* Địa chỉ Email",
  password: "* Mật khẩu",
  confirmpassword: "* Nhập lại mật khẩu",
  phone_number: "* Nhập số điện thoại",
};

let categoryPlaceHolder = {
  name: "* Tên danh mục",
};

let productPlaceHolder = {
  name: "* Tên sản phẩm",
};

const validateConfirmPassword = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject("Mật khẩu không khớp");
  },
});

const rulesCategory = {
  name: [{ required: true, message: "Vui lòng nhập tên sản phẩm!" }],
  category_id: [{ required: true, message: "Vui lòng chọn danh mục!" }],
  brand_id: [{ required: true, message: "Vui lòng chọn nhà sãn xuất!" }],
};

const rulesProduct = {
  name: [{ required: true, message: "Vui lòng nhập tên sản phẩm!" }],
};

const rulesSignUp = {
  user_name: [{ required: true, message: "Vui lòng nhập tài khoản của bạn!" }],
  fullname: [{ required: true, message: "Vui lòng nhập tên của bạn!" }],
  email: [{ required: true, message: "Vui lòng nhập Email của bạn!" }],
  password: [
    { required: true, message: "Vui lòng nhập mật khẩu!" },
    { min: 6, message: "Vui lòng nhập mật khẩu ít nhất 6 ký tự!" },
  ],
  confirmpassword: [
    { required: true, message: "Vui lòng nhập lại mật khẩu!" },
    validateConfirmPassword,
  ],
  phone_number: [{ required: true, message: "Vui lòng nhập số điện thoại!" }],
};

const rulesLogin = {
  user_name: [{ required: true, message: "Vui lòng nhập tài khoản của bạn!" }],
  password: [
    { required: true, message: "Vui lòng nhập mật khẩu!" },
    { min: 6, message: "Vui lòng nhập mật khẩu ít nhất 6 ký tự!" },
  ],
};

const userSignUp = {
  user_name: "",
  fullname: "",
  address: "",
  email: "",
  password: "",
};

const userLogin = {
  user_name: "",
  password: "",
  save: false,
};

export {
  userPlaceHolder,
  rulesCategory,
  rulesSignUp,
  rulesLogin,
  userSignUp,
  userLogin,
  categoryPlaceHolder,
  productPlaceHolder,
  rulesProduct,
};
