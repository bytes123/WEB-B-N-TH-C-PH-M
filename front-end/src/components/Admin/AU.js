import React from "react";
import Input from "../../utils/components/Input";

export default function AU({
  dataInput,
  handleChangeDataInput,
  list,
  errors,
  onSubmit,
  label,
  className,
}) {
  return (
    <form className="form p-4">
      {list.map((item) => (
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
      ))}
      <div className="form-wrapper flex justify-end">
        <button
          className={`form-btn rounded-lg p-4 text-white text-right ${className}`}
          onClick={onSubmit}
        >
          {label}
        </button>
      </div>
    </form>
  );
}
