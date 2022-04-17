import React from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PeopleProfile = () => {
  const { currentUser, people } = useGlobalContext();
  const PF = "https://instagram--api.herokuapp.com/profilePicture/";
  const navigate = useNavigate();

  const notify = () => {
    toast.success("You can't message yourself!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleClick = async () => {
    const convInfo = {
      senderId: currentUser._id,
      receiverId: people._id,
    };
    try {
      const res = await axios.post(
        "https://instagram--api.herokuapp.com/api/conversation",
        convInfo
      );
      navigate("/messanger");
    } catch (error) {
      if (error.response.data === "You can't message yourself!") {
        console.log("sdfgsdfg");
        notify();
      } else {
        navigate("/messanger");
        console.log(error);
      }
    }
  };

  return (
    <>
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
        style={{ position: "absolute", top: "0%" }}
      />
      <div className="peopleProfile shadow ">
        <img
          src={
            people.profilePicture
              ? PF + people.profilePicture
              : "/images/blank_img.jpg"
          }
          alt="img"
        />
        <h2>{people.userName}</h2>
        <button onClick={handleClick}>Message</button>
      </div>
    </>
  );
};

export default PeopleProfile;
