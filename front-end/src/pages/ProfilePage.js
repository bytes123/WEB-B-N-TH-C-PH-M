import React from "react";
import { loginedUser } from "../utils/hooks/useAccessUser";
import UpdateUser from "../components/User/UpdateUser";
import useUser from "../utils/hooks/useUser";
import Spinner from "../utils/components/Spinner";
import Toast from "../utils/components/Toast";

export default function ChangePasswordPage() {
  const { isLoading, isToast, user } = useUser(loginedUser);
  console.log(user);
  return (
    <div className="min-h-[70vh] bg-[url('https://cdn.tgdd.vn/mwgcart/orderhistory/images/bg.png')]">
      <Spinner isLoading={isLoading} />
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      {loginedUser ? (
        <div className="max-w-[1000px]   mx-auto m-10 p-5">
          <h1 className="text-4xl font-semibold mb-10">Thông tin cá nhân</h1>
          <UpdateUser user={user} />
        </div>
      ) : (
        <h1 className="text-6xl font-quicksand font-semibold my-10 text-center">
          Vui lòng đăng nhập để tiếp tục
        </h1>
      )}
    </div>
  );
}
