"use client";
import React, { useState } from "react";
import NavBar from "@/components/Navbar";
import { CustomButton } from "@/components";
import useFirebaseData from "@/hooks/useFirebaseData";
import { auth } from "../firebase";
const page = () => {
  const userUid = auth.currentUser ? auth.currentUser.uid : null;
  const { data, loading } = useFirebaseData("/websites");
  const { data: userData, loading: loadingUser } = useFirebaseData(
    `/usersPersonalData/${userUid}`
  );

  const currentUserWebsites = data.filter(
    (website) => website.addedBy === userUid
  );
  console.log(`Output mojego api`, userData);

  return (
    <>
      <div className="profileContainer">
        <NavBar />
        <div className="profileWrapper">
          <div className="profileGrid">
            <div className="profileBasicData relative">
              <img
                src={"./user-avatar.png"}
                alt="user avatar"
                className="userAvatarProfile"
              />
              <span className="profileAbout">
                {userData[4]}, {userData[3]}
              </span>
              <p className="text-gray-500">{userData[0]}</p>
              <p className="absolute bottom-0 p-10">Fav {userData[1]}</p>
            </div>

            <div className="profileSmallStats">
              <div className="profileSmallStatsData ">
                <p>67</p>
                <p>Websites</p>
              </div>
              <div className="profileSmallStatsData">
                <p>100</p>
                <p>Followers</p>
              </div>
              <div className="profileSmallStatsData">
                <p>3</p>
                <p>Hours</p>
              </div>
              <div className="profileSmallStatsDataBorder">
                <p>10</p>
                <p>Stars</p>
              </div>
              <div className="buttonContainerProfile">
                <CustomButton
                  title="Message"
                  containerStyles="bg-transparent text-white rounded-full  border border-blue-600 text-primary-blue text-inherit"
                  btnType="button"
                  isSubmit={false}
                />
              </div>
            </div>
            <div className="recentActivity">
              <p className="text-gray-500">Websites Added</p>
              <div className="mt-5">
                {currentUserWebsites.map((website) => (
                  <img
                    key={website.websiteId}
                    src={website.imageUrl}
                    alt="website"
                    className="websiteAdded"
                  />
                ))}
              </div>
            </div>
            <div className="websitesAdded">
              <p className="text-gray-500 contactsProfile">Contacts</p>
              <div className="mt-5">
                <img
                  src={"./chatgptjpg.jpg"}
                  alt="website "
                  className="websiteAdded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
