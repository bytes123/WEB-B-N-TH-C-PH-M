import React from "react";
import { host } from "../../static/API";
export default function HeaderUser({ onPopup, className, user }) {
  return (
    <div className="relative bottom-1 block " onClick={onPopup}>
      <div className="avatar cursor-pointer">
        <img
          className={`rounded-full ${className}`}
          src={
            user?.avatar
              ? `http://${host}:8000/resources/avatar/${user.avatar}`
              : `http://${host}:8000/resources/avatar/default.jpg`
          }
          alt=""
        />
      </div>
    </div>
  );
}
