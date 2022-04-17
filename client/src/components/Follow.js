import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import { NavLink } from "react-router-dom";

const Follow = ({ user }) => {
  const [follow, setFollow] = useState(false);
  const { setPeople, currentUser, setCurrentUser } = useGlobalContext();
  const [clickUser, setClickUser] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const info = {
        userId: currentUser._id,
      };
      try {
        const res = await axios.post(
          `https://instagram--api.herokuapp.com/api/users/${user._id}/checkFollowUnFollow`,
          info
        );
        if (res.data === "Followed") {
          setFollow(true);
        }
        if (res.data === "Unfollowed") {
          setFollow(false);
        }
      } catch (error) {
        setFollow(false);
        console.log(error);
      }
    };
    fetch();
  }, [currentUser._id, user._id]);

  const PF =
    "https://instagram--api.herokuapp.com/profilePicture/" +
    user.profilePicture;

  const handleFollowUnFollow = async () => {
    try {
      if (!follow) {
        try {
          await axios.put(
            `https://instagram--api.herokuapp.com/api/users/${user._id}/follow`,
            {
              userId: currentUser._id,
            }
          );
          const updateUser = await axios.get(
            "https://instagram--api.herokuapp.com/api/users?userId=" +
              currentUser._id
          );
          setCurrentUser(updateUser.data);
          setFollow(true);
        } catch (error) {
          if (error.response.data === "You con't follow yourself!") {
            setFollow(false);
          } else {
            setFollow(true);
          }
        }
      } else {
        try {
          await axios.put(
            `https://instagram--api.herokuapp.com/api/users/${user._id}/unfollow`,
            {
              userId: currentUser._id,
            }
          );
          const updateUser = await axios.get(
            "https://instagram--api.herokuapp.com/api/users?userId=" +
              currentUser._id
          );
          setCurrentUser(updateUser.data);
          setFollow(false);
        } catch (error) {
          setFollow(false);
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="follow" style={{ paddingTop: "12px" }}>
        <NavLink to="/peopleprofile">
          <div className="follow_img" onClick={() => setPeople(user)}>
            <img
              src={user.profilePicture ? PF : "images/blank_img.jpg"}
              alt="img"
            />
          </div>
        </NavLink>
        <div className="follow_name">
          <a href="">{user.userName}</a>
          <h6>Follows you</h6>
        </div>
        <div className="follow_follow">
          <h6 onClick={handleFollowUnFollow}>
            {follow ? "Following" : "Follow"}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Follow;
