import React from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

export default function Quantity({
  disabled = false,
  inputNumberValue,
  handleChangeInputNumber,
  handleUpInputNumber,
  handleDownInputNumber,
}) {
  return (
    <div className="m-auto flex items-center justify-center max-w-[80px] rounded-md  border-active">
      <input
        type="number"
        className="outline-none text-center text-brand border-none w-[50px] rounded-md py-5 px-2 font-mono text-3xl"
        value={inputNumberValue}
        onChange={handleChangeInputNumber && handleChangeInputNumber}
      />
      {!disabled ? (
        <div className="up-down h-100 text-active d-flex flex-col justify-center cursor-pointer">
          <MdKeyboardArrowUp
            onClick={handleUpInputNumber}
            className="h-100 text-3xl"
          />
          <MdKeyboardArrowDown
            onClick={handleDownInputNumber}
            className="h-100 text-3xl"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
