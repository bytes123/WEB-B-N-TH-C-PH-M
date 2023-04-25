import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { loginedUser } from "../../utils/hooks/useAccessUser";
import Time from "../../utils/components/Time";
import { Link } from "react-router-dom";
export default function MessageBar({ handleClose, list }) {
  return (
    <div className="message-wrapper p-8">
      <div className="message-top flex items-center justify-between">
        <h2 className="text-3xl">Messages</h2>
        <div className="close cursor-pointer" onClick={handleClose}>
          <AiOutlineCloseCircle className="text-4xl text-gray-400 " />
        </div>
      </div>
      <div className="message-bottom">
        <ul className="message-list mt-12">
          {list.map((item) => (
            <li className="message-item flex border-b-[1px] py-5">
              <div className="message-avatar w-[20%]">
                <img
                  className="rounded-full w-[36px] h-[36px]"
                  src="https://scontent.fsgn13-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=x3PhOYWAf78AX-hNfC9&_nc_ht=scontent.fsgn13-1.fna&oh=00_AfDiNTYPiIGzcmx_Wn1Y7xDQJL_lGjUd7e9eq-haCwJ2ag&oe=643D5DF8"
                  alt=""
                />
              </div>
              <div className="mesage-detail ml-7 w-[80%]">
                <Link to={`/admin/quan-ly-tin-nhan/${item.roomid}`}>
                  <div className="message-name">
                    <p className="font-bold text-xl">
                      {item.lastest_user_name == loginedUser.user_name
                        ? "Bạn"
                        : item.partner_fullname}
                    </p>
                  </div>
                  <div className="message-infor mt-2">
                    <p className="msg-body font-[300] text-2xl mb-2">
                      {item.lastest_msg}
                    </p>
                  </div>
                  <div className="message-time">
                    <span className="font-[300]">
                      <Time timestamp={item.lastest_time} />
                    </span>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
