import React from "react";
import StarpointSection from "../Utils/StarpointSection";
import ShowMore from "react-show-more-list";

export default function ReviewSection({ className, rateList }) {
  return (
    <div className={`${className} product_review-wrapper`}>
      <h3 className="text-3xl font-bold font-mono mb-10">
        Lời nhận xét & số sao
      </h3>
      <ShowMore items={rateList} by={1}>
        {({ current, onMore }) => (
          <>
            <ul className="product_review-list">
              {current.map((item, index) => (
                <li className="product_review-item border rounded-2xl p-10 mb-5">
                  <div className="flex" key={item.id}>
                    <div className="profile-infor mb-5">
                      <img
                        src={item.avatar}
                        alt=""
                        className="avatar rounded-full w-[130px] h-[80px]"
                      />
                      <p className="text-active font-bold mt-5">
                        {item.fullname}
                      </p>
                    </div>
                    <div className="rate-main ml-10">
                      <p className="rate-date opacity-60 mb-2">
                        27/09/2023 vào lúc 3:12 pm
                      </p>
                      <StarpointSection
                        starpoint={item.starpoint}
                        className={"mb-2"}
                      />
                      <p className="rate-content font-semibold opacity-70 text-2xl leading-9">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {current.length < rateList.length ? (
              <button
                className="background-active mt-5 text-white font-semibold font-quicksand text-2xl p-4 rounded-2xl"
                onClick={() => {
                  if (!!onMore) onMore();
                }}
              >
                Xem thêm
              </button>
            ) : (
              ""
            )}
          </>
        )}
      </ShowMore>
    </div>
  );
}
