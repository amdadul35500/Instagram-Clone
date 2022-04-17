import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const UserName = ({ user }) => {
  const { setPeople } = useGlobalContext();
  const PF =
    "https://instagram--api.herokuapp.com/profilePicture/" +
    user.profilePicture;

  return (
    <div>
      <div className="profilr_title_edit">
        <div className="post_profile" onClick={() => setPeople(user)}>
          <NavLink to="/peopleprofile">
            <img
              src={user.profilePicture ? PF : "/images/blank_img.jpg"}
              alt="img"
            />
          </NavLink>
        </div>
        <div className="post_username" onClick={() => setPeople(user)}>
          <NavLink to="/peopleprofile">{user.userName}</NavLink>
        </div>

        <div className="post_edit">
          <svg
            aria-label="More options"
            class="_8-yf5 "
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default UserName;
