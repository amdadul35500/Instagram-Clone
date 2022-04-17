import React from "react";

const Messages = ({ message, own }) => {
  return (
    <>
      <div className="msg-main">
        <div className={own ? "msg-2" : "msg"}>
          <img src="/images/blank_img.jpg" alt="img" />
          <h3 className="border border-1 shadow p-3">{message.text}</h3>
        </div>
        <p
          className={own ? "msg-2-p" : ""}
          style={{ textAlign: "start", marginLeft: "45px", marginTop: "10px" }}
        ></p>
      </div>
    </>
  );
};

export default Messages;
