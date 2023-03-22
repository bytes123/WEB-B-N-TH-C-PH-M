import React from "react";

export default function Modal({ active, children, className }) {
  return (
    <div
      className={`${active ? "modal-blur active" : "modal-blur"} ${className}`}
    >
      {children}
    </div>
  );
}
