import React from "react";

const userForm = [
  {
    label: "Ảnh đại diện",
    type: "file",
    name: "user_image",
  },
  {
    label: "Tên tài khoản",
    type: "text",
    name: "user_name",
  },
  {
    label: "Mật khẩu",
    type: "text",
    name: "user_password",
  },
  {
    label: "Địa chỉ",
    type: "text",
    name: "user_address",
  },
];

const catalogForm = [
  {
    label: "Tên danh mục",
    type: "text",
    name: "catalog_name",
  },
];

const productForm = [
  {
    label: "Hình hãng",
    type: "file",
    name: "product_image",
  },
  {
    label: "Tên sản phẩm",
    type: "text",
    name: "product_name",
  },
];

const brandForm = [
  {
    label: "Tên hãng",
    type: "text",
    name: "brand_name",
  },
  {
    label: "Số điện thoại hãng",
    type: "text",
    name: "brand_phone_number",
  },
  {
    label: "Email hãng",
    type: "email",
    name: "brand_email",
  },
  {
    label: "Địa chỉ hãng",
    type: "text",
    name: "brand_address",
  },
];

export { userForm, catalogForm, productForm, brandForm };
