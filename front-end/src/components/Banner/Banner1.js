import React from "react";
import { host } from "../../static/API";
export default function Banner1() {
  return (
    <div>
      <img
        className="max-h-[400px] object-cover"
        src={`http://${host}:8000/resources/images/banner-3.jpg`}
        alt=""
      />
    </div>
  );
}
