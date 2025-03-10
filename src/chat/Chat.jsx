import React, { useEffect, useState } from "react";
import { createConnection } from "../utils/socket";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([{ text: "hello" }]);
  const [newMessage, setNewMessage] = useState("");

  const { targetId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = userId.firstName;

  useEffect(() => {
    if (!user) return;
    // Whenver page loads mount the socket
    const socket = createConnection();

    socket.emit("joinChat", { targetId, userId });

    socket.on("messageReceived", ({ newMessage }) => {
      console.log(newMessage);
    });

    // After completation umMount socket
    return () => {
      socket.disconnect();
    };
  }, []);

  const setMessageHandler = () => {
    const socket = createConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId: userId,
      targetId,
      newMessage,
    });
  };

  return (
    <div className="p-10 min-h-screen flex items-center justify-start flex-col">
      <h1 className="text-3xl text-left mb-5 font-bold text-zinc-400">Chat</h1>
      <div className="w-3/4 border border-zinc-300 rounded-md h-[75vh] overflow-scroll relative">
        {messages &&
          messages.map((mes, idx) => {
            return (
              <div key={idx} className="message-bubble-container">
                <div className="chat chat-start p-5">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-50">12:45</time>
                  </div>
                  <div className="chat-bubble">You were the Chosen One!</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
                <div className="chat chat-end p-5">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    Anakin
                    <time className="text-xs opacity-50">12:46</time>
                  </div>
                  <div className="chat-bubble">I Know!</div>
                  <div className="chat-footer opacity-50">Seen at 12:46</div>
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
