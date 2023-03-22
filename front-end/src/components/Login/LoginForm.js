import React, { useEffect, useState } from "react";
import { Card, Input, Form, Button, Checkbox } from "antd";
import {
  defaultPlaceHolder,
  rulesLogin as rules,
  userLogin as defaultUser,
} from "../../static/UserForm";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";

export default function LoginForm() {
  const [form] = Form.useForm();

  const [placeHolder, setPlaceHolder] = useState(defaultPlaceHolder);
  const [user, setUser] = useState(defaultUser);

  const handleSubmit = (user) => {
    delete user.confirm;
    setUser(user);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleFocusPlaceHolder = (name) => {
    setPlaceHolder({
      ...placeHolder,
      [name]: "",
    });
  };

  const handleBlurPlaceHolder = () => {
    setPlaceHolder(defaultPlaceHolder);
  };

  return (
    <div className="user_form">
      <h3 className="text-2xl text-center mx-auto w-[400px] font-bold my-16">
        Đăng nhập hoặc tạo tài khoản
      </h3>

      <Card
        style={{
          width: "420px",
          margin: "0 auto",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        }}
      >
        <div className="login_fb-btn">
          <GoogleLoginButton
            text="Đăng nhập bằng Google"
            className="h-[30px] text-xl my-0 mb-[1.2rem]"
            iconSize="1.6rem"
          />
          <LoginSocialFacebook
            appId="777825046653704"
            onResolve={(res) => console.log(res)}
            onReject={(err) => console.log(err)}
          >
            <FacebookLoginButton
              text="Đăng nhập bằng Facebook"
              className="h-[30px] text-xl my-0"
              iconSize="1.6rem"
            />
          </LoginSocialFacebook>
        </div>
        <p className="text-center py-4">Hoặc</p>
        <Form form={form} onFinish={handleSubmit} initialValues={defaultUser}>
          <Form.Item name="email" rules={rules.email}>
            <Input
              onFocus={() => handleFocusPlaceHolder("email")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.email}
              className="font-medium"
            />
          </Form.Item>
          <Form.Item name="password" rules={rules.password}>
            <Input.Password
              onFocus={() => handleFocusPlaceHolder("password")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.password}
              className="font-medium"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form_btn py-6 text-xl flex items-center justify-center"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
