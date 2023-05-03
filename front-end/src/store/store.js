import { configureStore } from "@reduxjs/toolkit";
import authenSlice from "../features/authen/authenSlice";
import userSlice from "../features/user/userSlice";
import messageSlice from "../features/message/messageSlice";
import categorySlice from "../features/category/categorySlice";
import productSlice from "../features/product/productSlice";
import brandSlice from "../features/brand/brandSlice";
export const store = configureStore({
  reducer: {
    auth: authenSlice,
    user: userSlice,
    message: messageSlice,
    category: categorySlice,
    product: productSlice,
    brand: brandSlice,
  },
});
