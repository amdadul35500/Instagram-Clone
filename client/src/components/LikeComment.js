import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const LikeComment = ({ user, post }) => {
  const [text, setText] = useState("");
  const buttonRef = useRef();
  const [count, setCount] = useState(post.likes.length);
  const likeRef = useRef();
  const { currentUser } = useGlobalContext();
  const [comment, setComment] = useState([]);
  const [blank, setBlank] = useState("shahin");

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        "https://instagram--api.herokuapp.com/api/posts/" + post._id
      );
      setComment(res.data);
    };
    fetchComment();
  }, [post._id, blank]);

  const commentHandle = async () => {
    const commentInfo = {
      userId: user._id,
      postId: post._id,
      comment: text,
    };
    try {
      const res = await axios.post(
        `https://instagram--api.herokuapp.com/api/posts/${post._id}/comment`,
        commentInfo
      );
      setText("");
      setBlank("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `https://instagram--api.herokuapp.com/api/posts/${post._id}/like`,
        {
          userId: currentUser._id,
        }
      );
      if (res.data === "the post has been liked!") {
        likeRef.current.style.fill = "red";
        setCount(count + 1);
      } else {
        likeRef.current.style.fill = "#262626";
        setCount(count - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Like com */}
      <div>
        <div className="like_comment_share">
          <div className="like_btn" onClick={handleLike}>
            <svg
              aria-label="Activity Feed"
              class="_8-yf5 "
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
              ref={likeRef}
            >
              <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
            </svg>
          </div>
          <div className="comment_btn">
            <svg
              aria-label="Comment"
              class="_8-yf5 "
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </div>
          <div className="share_btn">
            <svg
              aria-label="Share Post"
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
          </div>
          <div className="mark_btn">
            <svg
              aria-label="Save"
              class="_8-yf5 "
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <polygon
                fill="none"
                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* like_comment */}
        <div className="like_comment">
          <NavLink to="#">
            {count} <span>likes</span>
          </NavLink>
          {post.desc && (
            <>
              <NavLink to="#">{user.userName}</NavLink>
              <span>{post.desc || null}</span>
            </>
          )}

          {comment.map((c) => {
            return (
              <div>
                <NavLink
                  to="#"
                  style={{ display: "inline", marginRight: "5px" }}
                >
                  {currentUser.userName}
                </NavLink>
                <span>{c.comment || null}</span>
              </div>
            );
          })}

          <NavLink to="#" className="nav1">
            View all 867 comments
          </NavLink>
          <NavLink to="#" className="nav2"></NavLink>
        </div>
      </div>

      <div className="post_comment">
        <span style={{ marginRight: "10px" }}>
          <svg
            aria-label="Emoji"
            class="_8-yf5 "
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
          </svg>
        </span>
        <form className="comment_input">
          <input
            type="text"
            placeholder="Add a comment"
            onChange={(e) => {
              buttonRef.current.style.opacity = "1";
              setText(e.target.value);
            }}
          />
        </form>
        <div style={{ flexBasis: "6%" }}>
          <button ref={buttonRef} onClick={commentHandle}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export { LikeComment };
