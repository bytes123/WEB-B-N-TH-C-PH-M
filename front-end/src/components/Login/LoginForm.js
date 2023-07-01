import React, { useEffect, useState } from "react";
import { Card, Input, Form, Button, Checkbox } from "antd";
import {
  userPlaceHolder,
  rulesLogin as rules,
  userLogin as defaultUser,
} from "../../static/UserForm";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  loginRequest,
  getError,
  getLoginStatus,
  resetLoginStatus,
  loginFB,
  resetError,
} from "../../features/user/userSlice";
import { getSignUpStatus } from "../../features/authen/authenSlice";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function LoginForm() {
  const [form] = Form.useForm();
  let status = useSelector(getSignUpStatus);
  let error = useSelector(getError);
  const dispatch = useDispatch();
  const [placeHolder, setPlaceHolder] = useState(userPlaceHolder);
  const [user, setUser] = useState(defaultUser);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log(1);
    dispatch(resetError());
  }, [location.pathname]);

  useEffect(() => {
    console.log(status);
    if (status == "succeeded") {
      setIsAuthenticating(true);
    }
  }, [status]);

  const handleSubmit = async (values) => {
    setUser(user);
    await dispatch(loginRequest(values)).unwrap();
  };

  const handleFocusPlaceHolder = (name) => {
    setPlaceHolder({
      ...placeHolder,
      [name]: "",
    });
  };

  const handleBlurPlaceHolder = () => {
    setPlaceHolder(userPlaceHolder);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="user_form">
      <h3 className="text-2xl text-center mx-auto w-[400px] font-bold my-16">
        Đăng nhập hoặc tạo tài khoản
      </h3>

      <Card
        style={{
          width: "520px",
          margin: "0 auto",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        }}
      >
        {/* <div className="login_fb-btn">
          <GoogleLoginButton
            text="Đăng nhập bằng Google"
            className="h-[30px] text-xl my-0 mb-[1.2rem]"
            iconSize="1.6rem"
          />
          <LoginSocialFacebook
            appId="177094665300279"
            onResolve={(res) => dispatch(loginFB(res.data)).unwrap()}
            onReject={(err) => console.log(err)}
          >
            <FacebookLoginButton
              text="Đăng nhập bằng Facebook"
              className="h-[30px] text-xl my-0"
              iconSize="1.6rem"
            />
          </LoginSocialFacebook>
        </div> */}
        {/* <p className="text-center py-4">Hoặc</p> */}
        <Form form={form} onFinish={handleSubmit} initialValues={defaultUser}>
          <h3 className="font-quicksand font-semibold mb-2">Tài khoản</h3>
          <Form.Item name="user_name" rules={rules.user_name}>
            <Input
              onFocus={() => handleFocusPlaceHolder("user_name")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.user_name}
              className="font-medium"
            />
          </Form.Item>
          <h3 className="font-quicksand font-semibold mb-2">Mật khẩu</h3>
          <Form.Item name="password" rules={rules.password}>
            <Input.Password
              onFocus={() => handleFocusPlaceHolder("password")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.password}
              className="font-medium"
            />
          </Form.Item>
          {error == "FAILED_LOGIN" ? (
            <p className="error mb-5">Tài khoản hoặc mật khẩu không hợp lệ !</p>
          ) : error == "ACCOUNT_LOCKED" ? (
            <p className="error mb-5">Tài khoản đã bị khóa!</p>
          ) : error == "ACCOUNT_INVALID_LOCKED" ? (
            <p className="error mb-5">
              Tài khoản đã bị khóa do nhập sai quá 5 lần!
            </p>
          ) : (
            ""
          )}
          <Form.Item>
            <div className="flex justify-between">
              <Link
                to="/reset-password"
                className="font-semibold text-green-600"
              >
                Quên mật khẩu?
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                className="background-active   text-2xl flex items-center justify-center"
              >
                Đăng nhập
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
