import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import ChatForm from "../../components/Chat/ChatForm";
import {
  fetchMessagesByRoom,
  fetchMessageListAll,
  dropRoom,
  getChatList,
  createCustomerRoom,
  fetchMessageListByUser,
} from "../../features/message/messageSlice";
import { loginedUser } from "../../utils/hooks/useAccessUser";

const socket = io.connect("http://localhost:3001");

export default function AdminChatPage() {
  const dispatch = useDispatch();
  const [user, setUser] = React.useState(null);
  const [activeItem, setActiveItem] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  let fetch_chat_list = useSelector(getChatList);

  useEffect(() => {
    if (loginedUser) {
      setUser(loginedUser.user_name);
    }
  }, [loginedUser]);

  useEffect(() => {
    dispatch(fetchMessageListAll()).unwrap();
    socket.emit("join_room", "socket-web-app");
  }, []);

  useEffect(() => {
    socket.on("send_action", async () => {
      dispatch(fetchMessageListAll()).unwrap();
      if (activeItem && activeItem.roomid) {
        dispatch(fetchMessagesByRoom(activeItem.roomid)).unwrap();
      }
    });
    socket.on("receive_message", async (room) => {
      console.log(activeItem);
      dispatch(fetchMessageListAll()).unwrap();

      if (activeItem && room == activeItem.roomid) {
        dispatch(fetchMessagesByRoom(room)).unwrap();
      }
    });
  }, [socket, activeItem]);

  const handleActiveItem = (item) => {
    setActiveItem(item);
  };

  const sendMsg = async (currentMsg) => {
    if (currentMsg !== "") {
      const data = {
        room_id: activeItem.roomid,
        user_name: user,
        body: currentMsg,
      };

      await socket.emit("send_message", data);
      dispatch(fetchMessageListAll()).unwrap();
      await dispatch(fetchMessagesByRoom(data.room_id)).unwrap();
    }
  };

  const dropMsg = async () => {
    if (window.confirm("Bạn muốn xóa đoạn chat này ?")) {
      await dispatch(dropRoom(activeItem.roomid)).unwrap();
      await dispatch(fetchMessageListAll()).unwrap();
      await socket.emit("send_action");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      {loginedUser?.type_user_id == "admin-message" ? (
        <ChatForm
          socket={socket}
          list={fetch_chat_list}
          user={user}
          onSendMsg={sendMsg}
          activeItem={activeItem}
          setActiveItem={handleActiveItem}
          onDropMsg={dropMsg}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      ) : loginedUser?.type_user_id !== "admin-message" ? (
        <h1 className="font-semibold text-4xl p-10">
          Trang tin nhắn này chỉ dành cho admin
        </h1>
      ) : (
        <h1 className="font-semibold text-4xl p-10">Vui lòng đăng nhập</h1>
      )}
    </div>
  );
}
