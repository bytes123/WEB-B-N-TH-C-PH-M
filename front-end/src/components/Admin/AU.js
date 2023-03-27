import React, { useState, useEffect } from "react";
import Input from "../../utils/components/Input";
import { FiUpload } from "react-icons/fi";
import useUploadImage from "../../utils/hooks/Admin/useUploadImage";

export default function AU({
  dataInput,
  handleChangeDataInput,
  list,
  errors,
  onSubmit,
  label,
  className,
}) {
  const { imagePreview, setSelectedFile } = useUploadImage();

  return (
    <form className="form p-4 " onSubmit={onSubmit}>
      {list.map((item) =>
        item.type == "file" ? (
          <div className="form-image mb-3 ">
            <label className="form-label ">{item.label}</label>
            <div className="relative flex items-center justify-center w-[250px] h-[250px] ">
              <div className="absolute ">
                <FiUpload className="text-6xl" />
              </div>

              <input
                type="file"
                onChange={(e) => {
                  handleChangeDataInput(e);
                  setSelectedFile(e.target.files[0]);
                }}
                name={item.name}
                className=" absolute  cursor-pointer opacity-0 w-full h-full z-20"
              />

              <div>
                <img
                  className="opacity-70 h-full"
                  src={imagePreview ?? dataInput[item.name]}
                  alt=""
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="form-group mb-3">
            <label className="form-label ">{item.label}</label>
            <Input
              type={item.type}
              name={item.name}
              value={dataInput[item.name]}
              onChangeDataInput={handleChangeDataInput}
              className={
                errors[item.name]
                  ? "error-input"
                  : "focus:border-lime-600 border-2"
              }
            />
            {errors[item.name] ? (
              <p className="error-text">{errors[item.name]}</p>
            ) : (
              ""
            )}
          </div>
        )
      )}
      <div className="form-wrapper">
        <button className={`form-btn rounded-lg p-4 text-white  ${className}`}>
          {label}
        </button>
      </div>
    </form>
  );
}
