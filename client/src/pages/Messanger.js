import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import Conversation from "../components/Conversation";
import Messages from "../components/Messages";
import io from "socket.io-client";

const ENDPOINT = "https://instagram--api.herokuapp.com";
let socket;
const Messanger = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [currentChatName, setCurrentChatName] = useState({});
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useGlobalContext();
  const scrollRef = useRef();
  const PF = "https://instagram--api.herokuapp.com/profilePicture/";

  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    socket.on("new_message", (data) => {
      console.log(data);
      setMessage((prev) => [...prev, data]);
    });
  }, []);

  console.log(message);

  // get conversation of an login user
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          "https://instagram--api.herokuapp.com/api/conversation/" +
            currentUser._id
        );
        setConversation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [currentUser._id]);

  // get messages
  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          "https://instagram--api.herokuapp.com/api/message/" + currentChat?._id
        );
        setMessage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat._id]);

  // clicked to send message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newmessage = {
      senderId: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(
        "https://instagram--api.herokuapp.com/api/message",
        newmessage
      );

      setNewMessage("");

      console.log("11111");
      // socket
    } catch (error) {
      console.log(error);
    }
  };

  // get current chat information
  useEffect(() => {
    const currentChatNameFunc = async () => {
      const currentChatName = currentChat.members.find(
        (c) => c !== currentUser._id
      );
      try {
        const res = await axios.get(
          "https://instagram--api.herokuapp.com/api/users?userId=" +
            currentChatName
        );
        setCurrentChatName(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    currentChatNameFunc();
  }, [currentChat.members, currentUser._id]);

  // for smooth scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <Navbar />
      <div className="messanger position-absolute w-100">
        <div className="container">
          <div
            className=" messages-row row border border-1"
            style={{ padding: "0" }}
          >
            <div className="col-md-4 col-3 border-end messages-col-4 ">
              <div className="title border-bottom">
                <h2 className="text-center ">Amdadul Shahin</h2>
              </div>
              <div
                className="conversation-res"
                style={{ position: "relative", top: "14%" }}
              >
                {conversation.map((c) => {
                  return (
                    <div onClick={() => setCurrentChat(c)}>
                      <Conversation
                        key={c._id}
                        conversation={c}
                        currentUser={currentUser}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-8 col-9 messages-col-8">
              {currentChat._id ? (
                <>
                  <div className="msg-title">
                    <img src={PF + currentChatName.profilePicture} alt="img" />
                    <h2>{currentChatName.userName}</h2>
                  </div>

                  <div
                    className="msg-main-scroll"
                    style={{
                      height: "325px",
                      overflow: "hidden auto",
                      position: "relative",
                      top: "14%",
                    }}
                  >
                    {message.map((m) => {
                      return (
                        <div key={m._id} ref={scrollRef}>
                          <Messages
                            message={m}
                            own={m.senderId === currentUser._id}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <div className="msg-input mb-4 ">
                      <form
                        className="msg-form border border-1 "
                        onSubmit={handleSubmit}
                      >
                        <input
                          type="text"
                          placeholder="Message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit">Send</button>
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className=" messages-col-8-main">
                    <div className="msg-logo">
                      <svg
                        aria-label="Direct"
                        class="_8-yf5 "
                        color="#262626"
                        fill="#262626"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                        style={{
                          position: "absolute",
                          top: "40%",
                          left: "40%",
                        }}
                      >
                        <line
                          fill="none"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          x1="22"
                          x2="9.218"
                          y1="3"
                          y2="10.083"
                        ></line>
                        <polygon
                          fill="none"
                          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></polygon>
                      </svg>
                    </div>
                    <h2>Your Messages</h2>
                    <p>
                      Send private photos and <br /> messages to a friend or
                      group.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messanger;
