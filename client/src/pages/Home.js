import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import ProfileCollum from "../components/ProfileCollum";
import Story from "../components/Story";
import Suggestion from "../components/Suggestion";
import Navbar from "../components/Navbar";
import { useGlobalContext } from "../context/context";
import axios from "axios";

const Home = () => {
  const [post, setPost] = useState([]);
  const { setCurrentUser, currentUser } = useGlobalContext();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          "https://instagram--api.herokuapp.com/api/users/timeline/" +
            currentUser._id
        );
        setPost(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [currentUser._id]);

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="container main_home">
          <div className="row">
            <div className="col-md-8 col-12">
              {/* story component */}
              <Story />

              {/* post component */}
              {post.map((p) => {
                return (
                  <div>
                    <Post key={p._id} post={p} setPost={setPost} />;
                  </div>
                );
              })}
            </div>
            <div className="col-4 home-none" style={{ paddingLeft: "35px" }}>
              {/* profile component */}
              <div
                className="fixed_collum"
                style={{ position: "fixed", background: "#FAFAFA" }}
              >
                <ProfileCollum />
                <Suggestion />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
