export default function validateUser(values) {
  let errors = {};

  if (!values.user_name.trim()) {
    errors.user_name = "Vui lòng nhập tài khoản";
  }

  return errors;
}
