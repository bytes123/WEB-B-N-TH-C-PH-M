import { configureStore } from "@reduxjs/toolkit";
import authenSlice from "../features/authen/authenSlice";
import userSlice from "../features/user/userSlice";
import messageSlice from "../features/message/messageSlice";
export const store = configureStore({
  reducer: {
    auth: authenSlice,
    user: userSlice,
    message: messageSlice,
  },
});
