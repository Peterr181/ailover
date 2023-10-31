"use client";
import React from "react";
import useFirebaseData from "@/hooks/useFirebaseData";
import NavBar from "@/components/Navbar";
import Link from "next/link";
import CustomButton from "@/components/CustomButton";
import { AiFillStar } from "react-icons/ai";

const UserPage = ({ params }: { params: { slug: string } }) => {
  const { data, loading } = useFirebaseData(
    `/usersPersonalData/${params.slug}`
  );
  const { data: websitesData, loading: loadingWebsite } =
    useFirebaseData("/websites");

  const userWebsites = websitesData.filter(
    (item) => item.addedBy === params.slug
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  const [description, favWebsite, github, imageUrl, status, username, userUid] =
    data;

  return (
    <>
      <div className="profileContainer">
        <NavBar />
        <div className="profileWrapper">
          <div className="profileGrid relative">
            <div className="profileBasicData">
              {!imageUrl ? (
                <img
                  src={"./user-avatar.png"}
                  alt="user avatar"
                  className="userAvatarProfile"
                />
              ) : (
                <img
                  src={imageUrl}
                  alt="user avatar"
                  className="userAvatarProfile"
                />
              )}
              <span className="profileAbout">
                {username} , {username}
              </span>
              <p className="text-gray-500">{description}</p>
              <p className="pt-32 p-6 absolute bottom-0">
                Favourite website <br />{" "}
                <span className="text-blue-500">{favWebsite}</span>
              </p>
            </div>

            <div className="profileSmallStatistics">
              <div className="profileSmallStatsData2 ">
                <p>{userWebsites.length}</p>
                <p>
                  {userWebsites.length === 1 ? <p>Website</p> : <p>Websites</p>}
                </p>
              </div>

              <div className="profileSmallStatsData2">
                <p>3</p>
                <p>Hours</p>
              </div>
              <div className="profileSmallStatsDataBorder2">
                <p>10</p>
                <p>Stars</p>
              </div>
              <div className="buttonContainerProfile">
                <div className="buttonContainerProfileWrapper">
                  {github && (
                    <>
                      <Link href={github}>
                        <CustomButton
                          title="Github"
                          containerStyles="bg-transparent text-white rounded-full  border border-blue-600 text-primary-blue text-inherit font-bold"
                          btnType="button"
                          isSubmit={false}
                        />
                      </Link>
                      <CustomButton
                        title="Give a star"
                        containerStyles="bg-transparent text-white rounded-full  border border-blue-600 text-primary-blue text-inherit font-bold"
                        btnType="button"
                        isSubmit={false}
                        icon={<AiFillStar color="yellow" />}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="recentActivity">
              <p className="text-gray-500">Websites Added</p>
              <div className="mt-5 flex gap-5">
                {userWebsites.map((website) => (
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

export default UserPage;
