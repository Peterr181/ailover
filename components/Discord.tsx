import React from "react";

const Discord = () => {
  return (
    <div className="discordContainer pb-10">
      <div className="discordWrapper">
        <div className="discordLogo">
          <img
            src={"/discord-logo.png"}
            className="text-1xl w-60 h-100"
            alt="discord logo"
          />
        </div>
        <h2 className="text-1xl mt-4 font-bold">JOIN OUR DISCORD COMMUNITY</h2>
        <p className="text-3xl mt-4 ">
          Don't be shy and join our discord to ask more questions about our
          website. You can even add some ideas to improve working AILOVER even
          more!
        </p>
        <div className="mt-8 discordButton">
          <button className="text-1xl dcButton"> JOIN OUR DISCORD</button>
        </div>
      </div>
    </div>
  );
};

export default Discord;
