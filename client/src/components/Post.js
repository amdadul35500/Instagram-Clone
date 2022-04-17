import React, { useEffect, useState } from "react";
import Photo from "./Photo";
import UserName from "./UserName";
import { LikeComment } from "./LikeComment";
import axios from "axios";

const Post = ({ post }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `https://instagram--api.herokuapp.com/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    getUser();
  }, [post.userId]);

  return (
    <div>
      <div className="post">
        {/* profile_username_title */}
        <UserName user={user} />

        {/* post_image */}
        <Photo post={post} />

        <LikeComment user={user} post={post} />
      </div>
    </div>
  );
};

export default Post;
