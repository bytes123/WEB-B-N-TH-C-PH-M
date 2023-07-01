import React from "react";
import { host } from "../../static/API";
export default function MainLoading({ isLoading }) {
  return (
    <div
      className={`${
        isLoading ? "loading-visible z-[999]" : "loading-hidden -z-10"
      } fixed w-full h-full  bg-white flex justify-center items-center`}
    >
      <img
        className="w-[80px] h-[80px]"
        src={`http://${host}:8000/resources/images/loading.gif`}
        alt=""
      />
    </div>
  );
}
