import React from "react";
import StarpointSection from "../Utils/StarpointSection";

export default function ReviewSection({ className }) {
  return (
    <div className={`${className} product_review-wrapper`}>
      <h3 className="text-3xl font-bold font-mono mb-10">
        Lời nhận xét & số sao
      </h3>
      <ul className="product_review-list">
        <li className="product_review-item border rounded-2xl p-10">
          <div className="flex">
            <div className="profile-infor mb-5">
              <img
                src="https://shoppymultidash.netlify.app/static/media/avatar.ad026443bbabdf64ce71.jpg"
                alt=""
                className="avatar rounded-full w-[70px]"
              />
              <p className="text-active font-bold mt-5">Minh Tân</p>
            </div>
            <div className="rate-main ml-10">
              <p className="rate-date opacity-60 mb-2">
                27/09/2023 vào lúc 3:12 pm
              </p>
              <StarpointSection starpoint={4} className={"mb-2"} />
              <p className="rate-content font-semibold opacity-70 text-2xl leading-9">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
                adipisci dolorem illum pariatur, hic numquam vitae molestias
                omnis, ea vel voluptatum sequi nemo, delectus velit ex
                accusantium cum ipsum voluptates! Velit iure ipsum enim amet
                sequi corrupti consectetur nostrum dolorem?
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
