import React from "react";

export default function HeaderBar({ children, active }) {
  return (
    <div
      className={`${
        active ? "active" : ""
      } mobile px-6 pt-10 overflow-y-auto header-bar block md:hidden`}
    >
      {children}
    </div>
  );
}
