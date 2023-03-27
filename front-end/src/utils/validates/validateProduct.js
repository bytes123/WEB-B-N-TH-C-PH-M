export default function validateProduct(values) {
  let errors = {};

  if (!values.product_name.trim()) {
    errors.product_name = "Vui lòng nhập sản phẩm";
  }

  return errors;
}
