import React, { useState, useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGlobalContext } from "../context/context";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 400,
  bgcolor: "background.paper",
  border: "1px solid transparent",
  boxShadow: 24,
  borderRadius: "15px",
  overflow: "hidden",
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [desc, setDes] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const { setCurrentUser, none, handleModal, currentUser } = useGlobalContext();
  const PF =
    "https://instagram--api.herokuapp.com/profilePicture/" +
    currentUser.profilePicture;
  const navigate = useNavigate();

  const handlePost = async () => {
    const newPost = {
      userId: currentUser._id,
      desc: desc,
    };

    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      newPost.img = filename;
      try {
        await axios.post(
          "https://instagram--api.herokuapp.com/api/upload",
          formData
        );
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post(
        "https://instagram--api.herokuapp.com/api/posts",
        newPost
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleButton = () => {
    inputRef.current.click();
  };

  const handleLogout = async () => {
    await axios.delete("https://instagram--api.herokuapp.com/api/auth/logout");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <>
      <div className="container-fluid main-nav" style={{ position: "fixed" }}>
        <div className="row navbar-row">
          <div className="col-4">
            <NavLink to="/">
              <div className="instragram_logo">
                <img src="images/instragram_logo.png" alt="logo" />
              </div>
            </NavLink>
          </div>
          <div className="col-4 nav-none">
            <div className="search_box">
              <form className="d-flex search_bar">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div className="col-md-4 col-8">
            <div className="navbar_logo">
              {/* home logo */}
              <NavLink to="/">
                <svg
                  aria-label="Home"
                  class="_8-yf5 "
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 
                    0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"
                  ></path>
                </svg>
              </NavLink>
              {/* message logo*/}
              <NavLink to="/messanger">
                <svg
                  aria-label="Direct"
                  class="_8-yf5 "
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
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
              </NavLink>
              {/* upload logo */}
              <svg
                aria-label="New Post"
                class="_8-yf5 "
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                onClick={handleOpen}
              >
                <path
                  d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
                <line
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="6.545"
                  x2="17.455"
                  y1="12.001"
                  y2="12.001"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="12.003"
                  x2="12.003"
                  y1="6.545"
                  y2="17.455"
                ></line>
              </svg>

              {/* remdom photo logo*/}
              <svg
                aria-label="Find People"
                class="_8-yf5 "
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M13.173 13.164l1.491-3.829-3.83 1.49zM12.001.5a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012.001.5zm5.35 7.443l-2.478 6.369a1 1 0 01-.57.569l-6.36 2.47a1 1 0 01-1.294-1.294l2.48-6.369a1 1 0 01.57-.569l6.359-2.47a1 1 0 011.294 1.294z"></path>
              </svg>

              {/* love logo */}
              <svg
                aria-label="Activity Feed"
                class="_8-yf5 "
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
              </svg>

              {/* profile photo */}
              <img
                src={currentUser.profilePicture ? PF : "images/blank_img.JPG"}
                alt="PHOTO"
                style={{ cursor: "pointer" }}
                onClick={handleModal}
              />
            </div>
          </div>
        </div>
      </div>

      {/* logout and profile modal */}
      <div className={none ? "none" : "won-modal"}>
        <NavLink to="/profile">
          <div
            className="modal-profile"
            style={{ marginBottom: "6px", cursor: "pointer" }}
          >
            <svg
              aria-label="Profile"
              class="_8-yf5 "
              color="#262626"
              fill="#262626"
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16"
              className="profile"
            >
              <circle
                cx="12.004"
                cy="12.004"
                fill="none"
                r="10.5"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="2"
              ></circle>
              <path
                d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="2"
              ></path>
              <circle
                cx="12.006"
                cy="9.718"
                fill="none"
                r="4.109"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="2"
              ></circle>
            </svg>
            <h2>Profile</h2>
          </div>
        </NavLink>
        <NavLink to="/login">
          <div
            className="modal-logout"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <LogoutIcon className="logout" />
            <h2>Log Out</h2>
          </div>
        </NavLink>
      </div>

      {/* upload modal */}

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                className={file ? "typography" : null}
              >
                <div className="upload-logo">
                  <CloseIcon onClick={handleClose} className="close-icon" />
                  <h3>Create new post</h3>
                  <hr />
                  <svg
                    aria-label="Icon to represent media such as images or videos"
                    class="_8-yf5 "
                    color="#262626"
                    fill="#262626"
                    height="77"
                    role="img"
                    viewBox="0 0 97.6 77.3"
                    width="96"
                  >
                    <path
                      d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                      fill="currentColor"
                    ></path>
                  </svg>

                  <h1>Drag photos and videos here</h1>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                    ref={inputRef}
                  />
                  <button type="button" onClick={handleButton}>
                    Select from computer
                  </button>
                </div>
              </Typography>
              {file && (
                <Typography>
                  <div className="shareImgContainer">
                    <input
                      type="text"
                      placeholder="What's Your Mind?"
                      onChange={(e) => setDes(e.target.value)}
                    />
                    <img
                      src={URL.createObjectURL(file)}
                      alt="img"
                      className="shareImg"
                    />
                    <button
                      className="shareButton"
                      type="submit"
                      onClick={handlePost}
                    >
                      Share
                    </button>
                  </div>
                </Typography>
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Navbar;
