import React, { useState, useEffect, useRef } from "react";
import { Card, Input, Form, Button, Upload } from "antd";
import { rulesCategory as rules } from "../../../static/UserForm";
import useForm from "../../../utils/hooks/Admin/useForm";
import {
  addCategory,
  getErrors,
  resetError,
  resetAllErrors,
} from "../../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../utils/components/Toast";
import { categoryPlaceHolder } from "../../../static/UserForm";

export default function AddForm() {
  const dispatch = useDispatch();
  const signUpSubmit = async (values) => {
    dispatch(addCategory(values)).unwrap();
  };
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
    errors,
  } = useForm(signUpSubmit, getErrors, categoryPlaceHolder);

  return (
    <>
      <div className="user_form mt-5 h-screen">
        <Card
          style={{
            width: "800px",
            margin: "0 auto",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
          }}
        >
          <Form form={form} onFinish={handleSubmit}>
            <h3 className="font-quicksand font-semibold mb-2">Tên danh mục</h3>
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
                htmlType="submit"
                className="background-active border-none p-8 ml-auto text-2xl flex items-center justify-center font-bold"
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
