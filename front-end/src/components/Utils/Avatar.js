import React, { useState } from "react";

export default function Avatar({ imgData, handleChangeAvatar }) {
  return (
    <>
      <h3 className="font-quicksand font-semibold mb-4">Ảnh đại diện</h3>
      <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload">
          <img for="photo-upload" src={imgData} />
        </div>
        <input
          className="hidden"
          id="photo-upload"
          type="file"
          onChange={handleChangeAvatar}
        />
      </label>
    </>
  );
}
