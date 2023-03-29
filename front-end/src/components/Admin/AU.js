import React, { useState, useEffect } from "react";
import Input from "../../utils/components/Input";
import { FiUpload } from "react-icons/fi";
import useUploadImage from "../../utils/hooks/Admin/useUploadImage";
import Select from "react-select";

export default function AU({
  data,
  handleChangeData,
  list,
  errors,
  onSubmit,
  label,
  className,
  handleSelect,
}) {
  const { imagePreview, setSelectedFile } = useUploadImage();

  return (
    <form className="form p-4 " onSubmit={onSubmit}>
      {list.map((item) =>
        item.type == "file" ? (
          <div className="form-image mb-3 " key={item.name}>
            <label className="form-label ">{item.label}</label>
            <div className="relative flex items-center justify-center w-[250px] h-[250px] ">
              <div className="absolute ">
                <FiUpload className="text-6xl" />
              </div>

              <input
                type="file"
                onChange={(e) => {
                  handleChangeData(e);
                  setSelectedFile(e.target.files[0]);
                }}
                name={item.name}
                className=" absolute  cursor-pointer opacity-0 w-full h-full z-10"
              />

              <div>
                <img
                  className="opacity-70 h-full"
                  src={imagePreview ?? data[item.name]}
                  alt=""
                />
              </div>
            </div>
          </div>
        ) : item.type == "list" ? (
          <div className="form-list mb-5" key={item.name}>
            <div className="form-label">{item.label}</div>
            <Select
              className={
                errors[item.value_name]
                  ? "error-input rounded-xl border-2"
                  : " "
              }
              onChange={(data) => handleSelect(data.value, item.value_name)}
              defaultValue={
                data && {
                  value: data[item.value_name],
                  label: data[item.label_name],
                }
              }
              options={item.list.map((item) => {
                return {
                  value: item.value,
                  label: item.label,
                };
              })}
            />
            {errors[item.value_name] ? (
              <p className="error-text">{errors[item.value_name]}</p>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="form-group mb-3" key={item.name}>
            <label className="form-label ">{item.label}</label>
            <Input
              type={item.type}
              name={item.name}
              value={data[item.name]}
              onChangeDataInput={handleChangeData}
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
