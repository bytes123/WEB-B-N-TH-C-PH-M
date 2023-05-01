import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Radio } from "antd";
import { rulesCategory as rules } from "../../../static/UserForm";
import useHandleCategory from "../../../utils/hooks/Admin/useHandleCategory";
import useAdminCategory from "../../../utils/hooks/Admin/useAdminCategory";
import Cookies from "js-cookie";
import {
  addCategory,
  getErrors,
  resetError,
  resetAllErrors,
} from "../../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../utils/components/Toast";

export default function AddForm() {
  const [isToast, setIsToast] = useState(false);

  let newrules = useSelector(getErrors);

  const [errors, setErrors] = useState(newrules);
  const dispatch = useDispatch();

  const signUpSubmit = async (values) => {
    dispatch(addCategory(values)).unwrap();
  };

  useEffect(() => {
    setErrors(newrules);
  }, [newrules]);

  const clearErrors = (name) => {
    dispatch(resetError(name));
  };

  const {
    form,
    newValues,
    placeHolder,
    handleSubmit,
    handleFocusPlaceHolder,
    handleBlurPlaceHolder,
  } = useHandleCategory(signUpSubmit);

  useEffect(() => {
    console.log(newValues);
  }, [newValues]);

  return (
    <>
      <Toast body="Thêm tài khoản thành công" isSuccess={isToast} />
      <div className="user_form mt-5 h-screen">
        <Card
          style={{
            width: "800px",
            margin: "0 auto",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
          }}
        >
          <h3 className=" font-bold mb-5 text-3xl">Thông tin danh mục</h3>
          <Form form={form} onFinish={handleSubmit}>
            {errors?.name ? (
              <Form.Item
                onChange={() => clearErrors("name")}
                name="name"
                rules={rules.name}
                validateStatus={"error"}
                help={errors.name}
              >
                <Input
                  onFocus={() => handleFocusPlaceHolder("name")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.name}
                  className="font-medium"
                />
              </Form.Item>
            ) : (
              <Form.Item name="name" rules={rules.name}>
                <Input
                  onFocus={() => handleFocusPlaceHolder("name")}
                  onBlur={handleBlurPlaceHolder}
                  placeholder={placeHolder.name}
                  className="font-medium"
                />
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="form_btn py-6 text-2xl flex items-center justify-center font-bold"
              >
                Thêm danh mục
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
