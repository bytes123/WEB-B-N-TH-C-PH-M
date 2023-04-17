import React, { useEffect, useState } from "react";
import { Card, Input, Form, Button, Checkbox } from "antd";
import {
  defaultPlaceHolder,
  rulesSignUp as rules,
  userSignUp as defaultUser,
} from "../../static/UserForm";
import useSignUp from "../../utils/hooks/useSignUp";
import AddressForm from "../../utils/components/AddressForm";
import { values } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  signUpRequest,
  getErrors,
  getSignUpStatus,
  resetSignUpStatus,
} from "../../features/authen/authenSlice";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Utils/Avatar";
import useUploadImage from "../../utils/hooks/useUploadImage";

export default function SignUpForm() {
  const [form] = Form.useForm();

  let newrules = useSelector(getErrors);
  let status = useSelector(getSignUpStatus);
  const [error, setError] = useState(newrules);
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedFile,
    imagePreview = "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
    setSelectedFile,
  } = useUploadImage();
  const [imgData, setImgData] = useState({
    file: null,
    name: "",
    imagePreviewUrl: "",
  });

  const handleChangeAvatar = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    setImgData({
      ...imgData,
      file: selectedFile,
      imagePreviewUrl: imagePreview,
    });
  }, [imagePreview]);

  const signUpSubmit = async (values) => {
    values.avatar = imgData.file;
    dispatch(signUpRequest(values)).unwrap();
    setError(newrules);
  };

  const handleUserNameChange = () => {
    if ((error && error.user_name) || (error && error.email)) {
      setError({});
    }
  };

  useEffect(() => {
    console.log(newrules);
    setError(newrules);
  }, [newrules]);

  useEffect(() => {
    if (status == "succeeded") {
      const handleAuthentication = async () => {
        var inThirtySeconds = new Date(new Date().getTime() + 0.5 * 60 * 1000);
        await Cookies.set("isAuthenticating", true, {
          expires: inThirtySeconds,
          path: "/dang-nhap",
        });
        navigate("/dang-nhap");
      };

      handleAuthentication();
    }

    return () => dispatch(resetSignUpStatus());
  }, [status]);

  const {
    placeHolder,
    user,
    handleSubmit,
    handleFocusPlaceHolder,
    handleBlurPlaceHolder,
    handleAddress,
    errors,
    clearErrors,
  } = useSignUp(signUpSubmit);

  return (
    <div className="user_form mt-5">
      {/* <h3 className="text-2xl text-center mx-auto w-[400px] font-bold my-4">
        Tạo tài khoản
      </h3> */}
      <Card
        style={{
          width: "500px",
          margin: "0 auto",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
        }}
      >
        <h3 className="text-lg font-bold mb-2">Thông tin tài khoản</h3>
        <Form form={form} onFinish={handleSubmit} initialValues={defaultUser}>
          <Form.Item className="mt-5">
            <Avatar imgData={imgData} handleChangeAvatar={handleChangeAvatar} />
          </Form.Item>
          <Form.Item
            name="user_name"
            rules={rules.user_name}
            validateStatus={error && error.user_name && "error"}
            help={error && error.user_name}
          >
            <Input
              onChange={handleUserNameChange}
              onFocus={() => handleFocusPlaceHolder("user_name")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.user_name}
              className="font-medium"
            />
          </Form.Item>
          <Form.Item name="fullname" rules={rules.fullname}>
            <Input
              onFocus={() => handleFocusPlaceHolder("fullname")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.fullname}
              className="font-medium"
            />
          </Form.Item>
          <Form.Item name="phone_number" rules={rules.phone_number}>
            <Input
              onFocus={() => handleFocusPlaceHolder("phone_number")}
              onBlur={handleBlurPlaceHolder}
              placeholder={placeHolder.phone_number}
              className="font-medium"
            />
          </Form.Item>

          <AddressForm
            errors={errors}
            handleAddress={handleAddress}
            values={user}
            onClearErrors={clearErrors}
          />
          <h3 className="text-lg font-bold mb-2">Bảo mật tài khoản</h3>
          <Form.Item
            validateStatus={error && error.email && "error"}
            name="email"
            help={error && error.email && error.email}
            rules={rules.email}
          >
            <Input
              onChange={handleUserNameChange}
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
            name="confirmpassword"
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
          {/* <Form.Item name="subscribe" valuePropName="checked">
            <Checkbox size="large">Tôi muốn nhận mail từ Tan's Coffe</Checkbox>
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form_btn py-6 text-2xl flex items-center justify-center"
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
