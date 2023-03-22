import React, { useEffect, useState } from "react";
import { Card, Input, Form, Button, Checkbox } from "antd";
import {
  defaultPlaceHolder,
  rulesSignUp as rules,
  userSignUp as defaultUser,
} from "../../static/UserForm";

export default function SignUpForm() {
  const [form] = Form.useForm();

  const [placeHolder, setPlaceHolder] = useState(defaultPlaceHolder);
  const [user, setUser] = useState(defaultUser);

  const handleSubmit = (user) => {
    delete user.confirm;
    setUser(user);
  };

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
        Tạo tài khoản
      </h3>
      <Card
        style={{
          width: "420px",
          margin: "0 auto",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        }}
      >
        <h3 className="text-lg font-bold mb-5">Thông tin cá nhân</h3>
        <Form form={form} onFinish={handleSubmit} initialValues={defaultUser}>
          <Form.Item name="lastname" rules={rules.lastname}>
            <Input
              onFocus={() => handleFocusPlaceHolder("lastname")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.lastname}
              className="font-medium"
            />
          </Form.Item>
          <Form.Item name="firstname" rules={rules.firstname}>
            <Input
              onFocus={() => handleFocusPlaceHolder("firstname")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.firstname}
              className="font-medium"
            />
          </Form.Item>
          <h3 className="text-lg font-bold mb-5">Bảo mật tài khoản</h3>
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
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={rules.confirmpassword}
          >
            <Input.Password
              onFocus={() => handleFocusPlaceHolder("confirmpassword")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.confirmpassword}
              className="font-medium"
            />
          </Form.Item>
          <Form.Item name="subscribe" valuePropName="checked">
            <Checkbox size="large">Tôi muốn nhận mail từ Tan's Coffe</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form_btn py-6 text-lg flex items-center justify-center"
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
