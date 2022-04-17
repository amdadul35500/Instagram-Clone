import React, { useEffect, useState } from "react";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState({});
  const PF = "https://instagram--api.herokuapp.com/profilePicture/";

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(
          "https://instagram--api.herokuapp.com/api/users?userId=" + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser._id, conversation.members]);

  return (
    <>
      <div className="people" key={conversation._id}>
        <div className=" me-2 ">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : "/images/blank_img.jpg"
            }
            alt="img"
            className="people-img"
          />
        </div>
        <div className="people-2 people-2-none">
          <h2 className="">{user.userName}</h2>
        </div>
      </div>
    </>
  );
};

export default Conversation;
