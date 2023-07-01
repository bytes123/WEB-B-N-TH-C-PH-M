import React from "react";
import { Form, Input, Button } from "antd";

import { rulesForgetPassword as rules } from "../static/UserForm";
import useForgetPassword from "../utils/hooks/useForgetPassword";
import { MdArrowBack } from "react-icons/md";
import Spinner from "../utils/components/Spinner";
import { Link } from "react-router-dom";
import Toast from "../utils/components/Toast";

export default function ForgotPasswordPage() {
  const [form] = Form.useForm();
  const {
    step,
    handleSendMail,
    handleAuthCode,
    error,
    handleChangeInput,
    handleBack,
    handleChangePassword,
    isLoading,
    isToast,
  } = useForgetPassword(form);
  return (
    <div className="py-80  w-full h-full">
      <Spinner isLoading={isLoading} />
      <Toast
        style={isToast?.style}
        body={isToast?.body}
        isSuccess={isToast?.value}
      />
      <div
        className={`max-w-[500px]  mx-auto p-10  bg-white  ${
          step < 4 ? "border rounded-lg" : ""
        }`}
      >
        {step != 1 && step < 4 ? (
          <div
            className="inline-flex items-center mb-10 cursor-pointer text-orange-400 hover:text-orange-600 transition-colors"
            onClick={handleBack}
          >
            <MdArrowBack />
            <p className="text-2xl ml-2 font-semibold ">Trở lại</p>
          </div>
        ) : (
          ""
        )}

        {step == 1 ? (
          <>
            <h1 className="font-bold text-4xl mb-4">Khôi phục mật khẩu</h1>
            <h3 className="font-semibold mb-10">
              Vui lòng nhập địa chỉ email đã đăng ký và một mã khôi phục sẽ được
              gửi đến cho bạn
            </h3>

            <Form form={form} onFinish={handleSendMail}>
              <h3 className="font-quicksand font-semibold mb-2">Email</h3>
              {error && error.email ? (
                <Form.Item
                  validateStatus={"error"}
                  name="email"
                  help={error.email}
                  rules={rules.email}
                >
                  <Input
                    placeholder="Vui nhập địa chỉ email"
                    onChange={handleChangeInput}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="email" rules={rules.email}>
                  <Input placeholder="Vui nhập địa chỉ email" />
                </Form.Item>
              )}

              <Button
                type="primary"
                htmlType="submit"
                className="background-active w-full font-semibold text-2xl flex items-center justify-center"
              >
                Xác nhận
              </Button>
            </Form>
          </>
        ) : (
          ""
        )}

        {step == 2 ? (
          <>
            <h1 className="font-bold text-4xl mb-4">Kiểm tra email</h1>
            <h3 className="font-semibold mb-10">
              Một mã khôi phục vừa được gửi đến Email của bạn
            </h3>

            <Form form={form} onFinish={handleAuthCode}>
              <h3 className="font-quicksand font-semibold mb-2">
                Mã khôi phục
              </h3>

              {error && error.forgot_code ? (
                <Form.Item
                  validateStatus={"error"}
                  name="forgot_code"
                  help={error.forgot_code}
                  rules={rules.forgot_code}
                >
                  <Input
                    placeholder="Nhập mã khôi phục"
                    onChange={handleChangeInput}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="forgot_code" rules={rules.forgot_code}>
                  <Input placeholder="Nhập mã khôi phục" />
                </Form.Item>
              )}

              <Button
                type="primary"
                htmlType="submit"
                className="background-active mt-2 w-full font-semibold text-2xl flex items-center justify-center"
              >
                Xác thực
              </Button>
            </Form>
          </>
        ) : (
          ""
        )}
        {step == 3 ? (
          <>
            <h1 className="font-bold text-4xl mb-4">Nhập mật khẩu mới</h1>

            <Form form={form} onFinish={handleChangePassword}>
              <h3 className="font-quicksand font-semibold mb-2">
                Mật khẩu mới
              </h3>
              <Form.Item name="password" rules={rules.password}>
                <Input.Password placeholder="Nhập mật khẩu mới" />
              </Form.Item>

              <h3 className="font-quicksand font-semibold mb-2">
                Mật khẩu mới
              </h3>
              <Form.Item name="confirmpassword" rules={rules.confirmpassword}>
                <Input.Password placeholder="Xác nhận mật khẩu" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="background-active mt-2 w-full font-semibold text-2xl flex items-center justify-center"
              >
                Thay đổi mật khẩu
              </Button>
            </Form>
          </>
        ) : (
          ""
        )}

        {step == 4 ? (
          <>
            <h1 className="font-bold text-4xl mb-10 text-center text-green-700">
              Thay đổi mật khẩu thành công
            </h1>

            <Link
              className="background-active p-4 text-3xl rounded-lg block text-center mb-10"
              to="/dang-nhap"
            >
              Đăng nhập ngay
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
