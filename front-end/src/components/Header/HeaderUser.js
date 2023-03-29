import React from "react";

export default function HeaderUser({ onPopup }) {
  return (
    <div className="relative bottom-1 block " onClick={onPopup}>
      <div className="avatar cursor-pointer">
        <img
          className="w-[40px] rounded-full"
          src="https://shoppymultidash.netlify.app/static/media/avatar.ad026443bbabdf64ce71.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
