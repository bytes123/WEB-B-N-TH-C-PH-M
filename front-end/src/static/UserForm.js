let defaultPlaceHolder = {
  lastname: "* Họ",
  firstname: "* Tên",
  email: "* Địa chỉ Email",
  password: "* Mật khẩu",
  confirmpassword: "* Nhập lại mật khẩu",
};

const validateConfirmPassword = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject("Mật khẩu không khớp");
  },
});

const rulesSignUp = {
  lastname: [{ required: true, message: "Vui lòng nhập họ của bạn!" }],
  firstname: [{ required: true, message: "Vui lòng nhập tên của bạn!" }],
  email: [{ required: true, message: "Vui lòng nhập Email của bạn!" }],
  password: [
    { required: true, message: "Vui lòng nhập mật khẩu!" },
    { min: 6, message: "Vui lòng nhập mật khẩu ít nhất 6 ký tự!" },
  ],
  confirmpassword: [
    { required: true, message: "Vui lòng nhập lại mật khẩu!" },
    validateConfirmPassword,
  ],
};

const rulesLogin = {
  email: [{ required: true, message: "Vui lòng nhập Email của bạn!" }],
  password: [
    { required: true, message: "Vui lòng nhập mật khẩu!" },
    { min: 6, message: "Vui lòng nhập mật khẩu ít nhất 6 ký tự!" },
  ],
};

const userSignUp = {
  lastname: "",
  firstname: "",
  email: "",
  password: "",
  subscribe: false,
};

const userLogin = {
  email: "",
  password: "",
  save: false,
};

export { defaultPlaceHolder, rulesSignUp, rulesLogin, userSignUp, userLogin };
