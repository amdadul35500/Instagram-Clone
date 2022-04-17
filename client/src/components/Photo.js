import React from "react";
const PF = "https://instagram--api.herokuapp.com/images/";

const Photo = ({ post }) => {
  return (
    <div>
      <div className="post_image">
        <img className="img-fluid" src={PF + post.img} alt="IMG" />
      </div>
    </div>
  );
};

export default Photo;
