import React from "react";
import { Button } from "antd";

export default function ContentSectionFirst() {
  return (
    <div className="first_section py-10 flex flex-col justify-center items-center h-full">
      <h3 className="font-bold text-xl mb-5">Quà tặng giáng sinh</h3>
      <p className="mb-5 font-medium text-[15px] lg:w-[400px] text-center">
        Send holiday cheer in a flash with a thoughtful Starbucks eGift.
      </p>
      <Button className="section_btn font-bold w-auto">Đặt món ngay</Button>
    </div>
  );
}
