import React from "react";
import { story } from "../story";

const Story = () => {
  return (
    <div>
      <div className="story-section">
        {story.map((img, index) => {
          const { url, title } = img;
          return (
            <div className="single_story" key={index}>
              <img src={url} alt="STORY_IMG" />
              <h6>{title}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Story;
