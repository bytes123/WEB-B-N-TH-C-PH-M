import React from "react";

export default function Popup({ children, className }) {
  return (
    <div
      className={`fixed rounded right-5 top-[60px] w-[300px] min-h-[500px] bg-white ${className} z-10`}
    >
      {children}
    </div>
  );
}
