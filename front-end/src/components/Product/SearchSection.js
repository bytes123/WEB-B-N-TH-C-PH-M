import React from "react";
import { BiChevronDown } from "react-icons/bi";
import PopUp from "../../utils/components/Popup";
import { AiOutlineCheck } from "react-icons/ai";

export default function SearchSection({
  data,
  onSwitch,
  isOpenSearch,
  activeIndex,
  activeValueIndex,
  onActiveValueIndex,
}) {
  return (
    <div className="search_section-wrapper container pt-10 mx-auto flex items-center justify-between">
      <div className="search_section-label">
        <span className="font-bold opacity-60 text-2xl">
          Hiện có <span className="text-lime-600 ">30</span> sản phẩm dành cho
          bạn
        </span>
      </div>
      <div className="search_section-show-wrapper flex">
        {data.map((item, index) => (
          <div
            className="seach_section-show  relative mx-3 cursor-pointer border flex items-center p-5 rounded-xl "
            onClick={() => onSwitch(index)}
          >
            {index == activeIndex ? (
              <PopUp
                className="absolute left-0 top-full mt-1 w-full"
                style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 4px 12px" }}
              >
                <div
                  className="value cursor-auto  font-semibold"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.value.map((i, index) => (
                    <div
                      key={i.key}
                      style={{ backgroundColor: "#fff" }}
                      className="cursor my-1 pointer relative filter_value  p-4"
                      onClick={() => onActiveValueIndex(index)}
                    >
                      {activeValueIndex == index ? (
                        <AiOutlineCheck
                          className="text-lime-900 hv mr-2 absolute"
                          style={{ top: "50%", transform: "translateY(-50%)" }}
                        />
                      ) : null}
                      <p className="ml-8">{i.value}</p>
                    </div>
                  ))}
                </div>
              </PopUp>
            ) : (
              ""
            )}
            {item.icon}
            <span className="mx-1">{item.content}</span>
            <span className="mx-1">{item.length ? item[0].value : ""}</span>
            <BiChevronDown className="mx-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
