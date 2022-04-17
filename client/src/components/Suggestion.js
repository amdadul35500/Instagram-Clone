import React, { useEffect, useState } from "react";
import Follow from "./Follow";
import axios from "axios";

const Suggestion = () => {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = await axios.get(
          "https://instagram--api.herokuapp.com/api/users/all"
        );
        setAllUser(user.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      {/* suggestion */}
      <div className="sugges">
        <small>Suggestions For You</small>
        <small>See all</small>

        {allUser.map((u) => {
          return <Follow user={u} key={u._id} />;
        })}

        <div className="copy_right">
          <h6>
            About.Help.press.API.Jobs.Privacy.Terms.Location. <br />
            Top.Accounts.Hashtags,Languege
          </h6>
          <h6>© 2021 INSTAGRAM FROM META</h6>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
