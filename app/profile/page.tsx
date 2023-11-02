"use client";
import React, { useState } from "react";
import NavBar from "@/components/Navbar";
import { CustomButton } from "@/components";
import useFirebaseData from "@/hooks/useFirebaseData";
import { auth } from "../firebase";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
const page = () => {
  const userUid = auth.currentUser ? auth.currentUser.uid : null;
  const { data, loading } = useFirebaseData("/websites");
  const { data: userData, loading: loadingUser } = useFirebaseData(
    `/usersPersonalData/${userUid}`
  );

  const currentUserWebsites = data.filter(
    (website) => website.addedBy === userUid
  );

  const userGithub = userData && userData[2];
  console.log(userGithub);

  const [
    description,
    favWebsite,
    githubLink,
    imageUrl,
    stars,
    status,
    userNickname,
  ] = userData;

  return (
    <>
      <div className="profileContainer">
        <NavBar />
        <div className="profileWrapper">
          <div className="profileGrid">
            <div className="profileBasicData relative">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="user avatar"
                  className="userAvatarProfile"
                />
              ) : (
                <img
                  src={"./user-avatar.png"}
                  alt="user avatar"
                  className="userAvatarProfile"
                />
              )}
              <span className="profileAbout">
                {userNickname} , {status}
              </span>
              <p className="text-gray-500">{description}</p>

              <p className="">
                Favourite website <br />{" "}
                <span className="text-blue-500">{favWebsite}</span>
              </p>
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
                <div className="buttonContainerProfileWrapper">
                  {githubLink && (
                    <>
                      <Link href={githubLink}>
                        <CustomButton
                          title="Github"
                          containerStyles="bg-transparent text-white rounded-full  border border-blue-600 text-primary-blue text-inherit font-bold"
                          btnType="button"
                          isSubmit={false}
                        />
                      </Link>
                      <CustomButton
                        title="Edit"
                        containerStyles="bg-transparent text-white rounded-full  border border-blue-600 text-primary-blue text-inherit font-bold"
                        btnType="button"
                        isSubmit={false}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="recentActivity">
              <p className="text-gray-500">Websites Added</p>
              <div className="mt-5 flex gap-5">
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
                {/* <img
                  src={"./chatgptjpg.jpg"}
                  alt="website "
                  className="websiteAdded"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
