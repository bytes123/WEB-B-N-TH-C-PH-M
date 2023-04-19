import React from "react";
import { Button } from "antd";

export default function ContentSectionFirst() {
  return (
    <div className="first_section py-10 flex flex-col justify-center items-center h-full opacity-100">
      <h3 className="font-bold text-xl mb-5 text-white text-4xl">
        SHOP BÁN THỰC PHẨM
      </h3>
      <p className="mb-5 font-medium text-[15px] lg:w-[400px] text-center">
        {/* Send holiday cheer in a flash with a thoughtful Starbucks eGift. */}
      </p>
      <Button className="section_btn font-bold w-auto text-white">
        Đặt món ngay
      </Button>
    </div>
  );
}
