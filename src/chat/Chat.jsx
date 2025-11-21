import React, { useEffect, useState, useRef } from "react";
import { createConnection } from "../utils/socket";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { targetId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatMessages = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(
        BASE_URL + "/chat/getallchat/" + targetId,
        { withCredentials: true }
      );
      setMessages(response?.data?.chat?.messages || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load messages");
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch messages on component mount or targetId change
  useEffect(() => {
    fetchChatMessages();
  }, [targetId]);

  // Setup socket connection
  useEffect(() => {
    if (!user || !userId || !targetId) return;

    socketRef.current = createConnection();
    socketRef.current.emit("joinChat", { targetId, userId });

    // Only add messages from OTHER users (not yourself)
    socketRef.current.on("messageReceived", (data) => {
      // Check if this message is from the other person, not from yourself
      if (data.userId !== userId) {
        console.log("DATA FROM SERVER ", data);
        setMessages((prev) => [
          ...prev,
          {
            senderId: {
              _id: data.userId,
              firstName: data.firstName,
              lastName: data.lastName,
              photo: data.photo,
            },
            text: data.newMessage,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, targetId, user]);

  const setMessageHandler = () => {
    if (!newMessage.trim()) return;

    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        firstName: user.firstName,
        lastName: user.lastName,
        userId: userId,
        targetId,
        newMessage,
      });

      // Add message to local state immediately for better UX
      // This is your message, so it shows on the right

      setMessages((prev) => [
        ...prev,
        {
          senderId: {
            _id: userId,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          text: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);

      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setMessageHandler();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isLoading && messages.length === 0) {
    return (
      <div className="p-10 min-h-screen flex items-center justify-center">
        <p className="text-zinc-400">Loading messages...</p>
      </div>
    );
  }

  if (error && messages.length === 0) {
    return (
      <div className="p-10 min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen flex items-center justify-start flex-col">
      <h1 className="text-3xl text-left mb-5 font-bold text-zinc-400">Chat</h1>

      <div className="w-full max-w-4xl border border-zinc-300 rounded-md h-[75vh] flex flex-col bg-zinc-900">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-zinc-500">
                No messages yet. Start a conversation!
              </p>
            </div>
          ) : (
            messages.map((mes, idx) => {
              const isOwnMessage = mes?.senderId?._id === userId;
              return (
                <div
                  key={idx}
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`chat ${
                      isOwnMessage ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="User avatar"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      <h1 className="font-semibold">
                        {mes?.senderId?.firstName}
                      </h1>
                      {user?.isPremium === true && (
                        <span className="ml-1">✅</span>
                      )}
                      <time className="text-xs opacity-50 ml-2">
                        {formatTime(mes?.timestamp)}
                      </time>
                    </div>
                    <div
                      className={`chat-bubble ${
                        isOwnMessage
                          ? "bg-emerald-600 text-white"
                          : "bg-zinc-700 text-zinc-100"
                      }`}
                    >
                      <p>{mes?.text}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="border-t border-zinc-300 p-5 flex gap-4 bg-zinc-800">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            type="text"
            className="flex-1 bg-zinc-700 border border-zinc-600 rounded-md p-3 outline-none text-white placeholder:text-zinc-400"
            placeholder="Enter your message..."
          />
          <button
            onClick={setMessageHandler}
            disabled={!newMessage.trim()}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
