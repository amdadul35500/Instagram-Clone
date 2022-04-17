import React, { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [allPost, setAllPost] = useState([]);
  const inputRef = useRef();
  const { currentUser, setCurrentUser } = useGlobalContext();
  const PF =
    "https://instagram--api.herokuapp.com/profilePicture/" +
    currentUser.profilePicture;

  useEffect(() => {
    const fetch = async () => {
      try {
        const allPost = await axios.get(
          `https://instagram--api.herokuapp.com/api/posts/${currentUser._id}/allposts`
        );
        setAllPost(allPost.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [currentUser._id]);

  const notify = () => {
    toast.success("Photo Updated Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleCLick = () => {
    inputRef.current.click();
  };

  const handleChange = async () => {
    const file = inputRef.current.files["0"];

    try {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      console.log("hello");
      const res = await axios.put(
        "https://instagram--api.herokuapp.com/api/users/update/" +
          currentUser._id,
        formData
      );
      if (res) {
        const updateUser = await axios.get(
          "https://instagram--api.herokuapp.com/api/users?userId=" +
            currentUser._id
        );
        setCurrentUser(updateUser.data);
        notify();
      } else {
        console.log("Photo Updated is Fail!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-page pb-5">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="profile-img">
                <img
                  className="img-fluid"
                  src={
                    currentUser.profilePicture ? PF : "/images/blank_img.jpg"
                  }
                  alt="img"
                  onClick={handleCLick}
                />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  style={{ position: "absolute", top: "-4%" }}
                />
              </div>
              <p className="profile-img-p">Change Profile Photo</p>
              <input
                type="file"
                name="file"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={handleChange}
              />
            </div>
            <div className="col-8">
              <div className="profile-name">
                <h1>{currentUser.userName}</h1>
                <NavLink to="#">Edit Profile</NavLink>
                <SettingsIcon />
              </div>
              <div className="follow-follower">
                <h2 className="follow-follower-none">
                  32<span>posts</span>
                </h2>
                <h2>
                  {currentUser.followers.length}
                  <span>followers</span>
                </h2>
                <h2>
                  {console.log(currentUser.followings.length)}
                  {currentUser.followings.length}
                  <span>followings</span>
                </h2>
              </div>
              <div className="desc">
                <h1>Amdadul Shahin</h1>
                <h3>Blood Group: O+</h3>
              </div>
            </div>
          </div>

          <div className="row gy-4">
            <hr style={{ marginTop: "40px" }} />
            <div className="posts-button">POSTS</div>
            {allPost.map((p) => {
              return (
                <div className="col-4 profile-none">
                  <div className="posts-img">
                    <img
                      className="img-fluid"
                      src={
                        "https://instagram--api.herokuapp.com/images/" +
                          p.img || null
                      }
                      alt="img"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
