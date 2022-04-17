import React from "react";
import { useGlobalContext } from "../context/context";
import { NavLink } from "react-router-dom";

const ProfileCollum = () => {
  const { currentUser } = useGlobalContext();
  const PF =
    "https://instagram--api.herokuapp.com/profilePicture/" +
    currentUser.profilePicture;
  return (
    <div>
      <NavLink to="/profile">
        <div className="profile_row">
          <div style={{ flexBasis: "32%" }}>
            <img
              src={currentUser.profilePicture ? PF : "images/blank_img.JPG"}
              alt="img"
            />
          </div>

          <div style={{ flexBasis: "38%" }}>
            <a
              href="#"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "0.8px",
              }}
            >
              {currentUser.userName}
            </a>
            <h6
              style={{
                color: "rgba(142,142,142)",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              {currentUser.userName}
            </h6>
          </div>
          <div style={{ flexBasis: "30%" }}>
            <h6
              style={{
                fontWeight: "600",
                fontSize: "12px",
                color: "rgba(0,149,246)",
                textAlign: "end",
              }}
            >
              Switch
            </h6>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default ProfileCollum;
