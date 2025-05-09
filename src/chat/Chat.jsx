import React, { useEffect, useState } from "react";
import { createConnection } from "../utils/socket";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { targetId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
//   console.log(user?.firstName);


  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/chat/getallchat/" + targetId,
        { withCredentials: true }
      );

      //   console.log(response.data?.chat?.messages[0].senderId.firstName);
      setMessages(response?.data?.chat?.messages);
      //   console.log(response.data.chat.messages[0].timestamp);
      console.log(response.data?.chat?.messages[0].timestamp);

      console.log(user?.firstName);


      const chatMessages = response?.data?.messages?.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName || "unknown",
          lastName: senderId?.lastName || "unknow",
          text,
        };
      });
      //   setMessages(chatMessages);
      //   console.log(chatMessages);
    //   TODO: fix this when user.chat does not exits then ui should have new conversation text?
    // TODO: Fix why messages sent are show on left instead of right coz after refresh it shifts but not in realtime why"
      //   if (response.data?.chat.chat === null) {
      //     setMessages([]);
      //   }

      //   setMessages(response.data?.chat);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      fetchChatMessages();
    }
  }, [targetId]);
//   messages, user, newMessage, 

  useEffect(() => {
    if (!user) return;
    // Whenver page loads mount the socket
    const socket = createConnection();

    socket.emit("joinChat", { targetId, userId });

    socket.on("messageReceived", ({ firstName, newMessage }) => {
      setMessages((prev) => [
        ...prev,
        { senderId: firstName, text: newMessage },
      ]);
    });

    // console.log(messages);

    // After completation umMount socket
    return () => {
      socket.disconnect();
    };
  }, [userId, targetId]);
//   messages, user, newMessage

  const setMessageHandler = () => {
    const socket = createConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: userId,
      targetId,
      newMessage,
    });

    setNewMessage("")
  };

  return (
    <div className="p-10 min-h-screen flex items-center justify-start flex-col">
      <h1 className="text-3xl text-left mb-5 font-bold text-zinc-400">Chat</h1>
      <div className="w-3/4 border border-zinc-300 rounded-md h-[75vh] overflow-scroll relative">
        {messages && user &&
          messages?.map((mes, idx) => {
            return (
              <div key={idx} className="message-bubble-container">
                <div className={`chat ${mes?.senderId?.firstName === user?.firstName ? "chat-end" : "chat-start"} p-5`}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    <h1>{mes?.senderId?.firstName}</h1>
                    <span>{user?.isPremium === true? "✅": ""}</span>
                    <time className="text-xs opacity-50">11/3/25</time>
                  </div>
                  <div className="chat-bubble">
                    <h1>{mes?.text}</h1>
                  </div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              </div>
            );
          })}
        <div className="send-div flex justify-between p-10 absolute bottom-0 w-full gap-4">
          <input
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            type="text"
            className="w-full bg-transparent border border-r-zinc-400 rounded-md p-2 outline-none placeholder:text-zinc-500"
            placeholder="Enter your message"
          />
          <button
            onClick={setMessageHandler}
            className="px-4 py-1.5 bg-emerald-500 text-white rounded-md"
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
