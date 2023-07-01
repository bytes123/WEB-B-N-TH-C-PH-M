import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { nanoid } from "nanoid";
import ChatForm from "../components/Chat/ChatForm";
import {
  fetchMessageListByUser,
  fetchMessagesByRoom,
  getChatList,
  createCustomerRoom,
} from "../features/message/messageSlice";
import { loginedUser } from "../utils/hooks/useAccessUser";
import { host } from "../static/API";
import useUser from "../utils/hooks/useUser";
const socket = io.connect(`http://${host}:3001`);

export default function UserChatPage() {
  const { isLoading, isToast, user } = useUser(loginedUser);
  const dispatch = useDispatch();
  const [fetch_user, setUser] = React.useState(loginedUser?.user_name);
  const [activeItem, setActiveItem] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let fetch_chat_list = useSelector(getChatList);

  useEffect(() => {
    console.log(fetch_chat_list);
  }, [fetch_chat_list]);

  useEffect(() => {
    socket.emit("join_room", "socket-web-app");
  }, []);

  useEffect(() => {
    if (fetch_user) {
      dispatch(fetchMessageListByUser(fetch_user)).unwrap();
    }
  }, [user]);

  useEffect(() => {
    socket.on("send_action", async () => {
      await dispatch(fetchMessageListByUser(fetch_user)).unwrap();
      setIsSubmitting(false);
    });
    socket.on("receive_message", async (room) => {
      if (fetch_user) {
        await dispatch(fetchMessageListByUser(fetch_user)).unwrap();
      }

      if (activeItem && room == activeItem.roomid) {
        await dispatch(fetchMessagesByRoom(room)).unwrap();
      }
    });
  }, [socket, activeItem]);

  const sendMsg = async (currentMsg) => {
    if (user) {
      if (currentMsg !== "") {
        const data = {
          room_id: activeItem.roomid,
          user_name: fetch_user,
          body: currentMsg,
        };

        await socket.emit("send_message", data);
        await dispatch(fetchMessageListByUser(fetch_user)).unwrap();
        await dispatch(fetchMessagesByRoom(data.room_id)).unwrap();
      }
    } else {
      window.location("/");
    }
  };

  const handleCreateRoom = async () => {
    await dispatch(createCustomerRoom()).unwrap();

    await dispatch(fetchMessageListByUser(fetch_user)).unwrap();
    await socket.emit("send_action");
  };

  return (
    <div className="">
      {fetch_user && user?.type_user_id == "normal-customer" ? (
        <ChatForm
          socket={socket}
          list={fetch_chat_list}
          user={fetch_user}
          onSendMsg={sendMsg}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          handleCreateRoom={handleCreateRoom}
        />
      ) : fetch_user && user?.type_user_id != "normal-customer" ? (
        <h1 className="font-semibold text-6xl font-quicksand text-center p-10">
          Trang tin nhắn này chỉ dành cho khách hàng
        </h1>
      ) : (
        <h1 className="font-semibold font-quicksand text-center text-6xl p-10">
          Vui lòng đăng nhập
        </h1>
      )}
    </div>
  );
}
