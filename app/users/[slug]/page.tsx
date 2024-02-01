"use client";
import React, { useState } from "react";
import useFirebaseData from "@/hooks/useFirebaseData";
import NavBar from "@/components/Navbar";
import Link from "next/link";
import CustomButton from "@/components/CustomButton";
import { AiFillStar } from "react-icons/ai";
import { get, push, ref, set, update } from "firebase/database";
import { auth, db } from "@/app/firebase";
import { uid } from "uid";
import WebsiteModal from "@/components/WebsiteModal";
import ReactStars from "react-rating-star-with-type";

const UserPage = ({ params }: { params: { slug: string } }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalOpinion, setShowModalOpinion] = useState(false);
  const [selectedOpinionDescription, setSelectedOpinionDescription] =
    useState("");
  const [selectedNumberOfStars, setSelectedNumberOfStars] = useState(0);
  const [opinionMessage, setOpinionMessage] = useState("");
  const [selectedAddedBy, setSelectedAddedBy] = useState("");
  const [opinionStars, setOpinionStars] = useState<number>(0);
  const { data, loading } = useFirebaseData(
    `/usersPersonalData/${params.slug}`
  );
  const { data: websitesData, loading: loadingWebsite } =
    useFirebaseData("/websites");

  const { data: opinionsData, loading: loadingOpinions } = useFirebaseData(
    `/opinions/${params.slug}`
  );

  const [fallingStar, setFallingStar] = useState(false);

  const userWebsites = websitesData.filter(
    (item) => item.addedBy === params.slug
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  const [description, favWebsite, github, imageUrl, stars, status, nickname] =
    data;

  const handleAddStar = async () => {
    if (auth.currentUser) {
      const userDataRef = ref(db, `/usersPersonalData/${params.slug}`);
      const userDataSnapshot = await get(userDataRef);
      const userData = userDataSnapshot.val();
      userData.stars += 1;
      update(userDataRef, userData);

      setFallingStar(true);

      setTimeout(() => {
        setFallingStar(false);
      }, 2000);
    }
  };

  const addOpinion = async () => {
    const uidd = uid();
    const userUid = auth.currentUser ? auth.currentUser.uid : null;
    if (auth.currentUser) {
      const opinionsRef = ref(db, `/usersPersonalData/opinions/${params.slug}`);
      const newOpinionRef = push(opinionsRef);

      const newOpinionData = {
        opinionMessage: opinionMessage,
        opinionStars: opinionStars,
        userUid: userUid,
      };

      try {
        await set(newOpinionRef, newOpinionData);
        console.log("Opinion added successfully");
      } catch (error) {
        console.error("Error adding opinion:", error);
      }
    }
  };

  function renderStars(numberOfStars: number) {
    const starIcons = [];

    for (let i = 0; i < numberOfStars; i++) {
      starIcons.push(<AiFillStar key={i} color="yellow" />);
    }

    return starIcons;
  }

  return (
    <>
      {!fallingStar && (
        <img
          src="/starsfalling.png"
          alt="Falling Star"
          className="falling-star"
          id="fallingStar"
          style={{ display: "none" }}
        />
      )}
      {fallingStar && (
        <img
          src="/starsfalling.png"
          alt="Falling Star"
          className="falling-star"
          id="fallingStar"
        />
      )}
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
                {nickname} , {status}
              </span>
              <p className="text-gray-500 mt-3">{description}</p>
              <p className="absolute bottom-3">
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
                <p>0</p>
                <p>Contacts</p>
              </div>
              <div className="profileSmallStatsDataBorder2">
                <p>
                  {stars && stars} {!stars && 0}
                </p>
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
                        handleClick={handleAddStar}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="recentActivity">
              <p className="text-gray-500">Websites Added</p>
              <div className="mt-5 flex gap-5">
                {userWebsites.map((website, index) => (
                  <img
                    key={index}
                    src={website.imageUrl}
                    alt="website"
                    className="websiteAdded"
                  />
                ))}
              </div>
            </div>
            <div className="websitesAdded">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 contactsProfile">
                  Opinions about user
                </p>
                <CustomButton
                  title="Add opinion"
                  containerStyles="bg-transparent text-white rounded-full  border border-blue-600 text-primary-blue text-inherit font-bold"
                  btnType="button"
                  isSubmit={false}
                  handleClick={() => {
                    setShowModal(true);
                  }}
                />
                {showModal && (
                  <WebsiteModal onClose={() => setShowModal(false)}>
                    <div className="flex justify-center mb-5">
                      <ReactStars
                        value={opinionStars}
                        isEdit={true}
                        activeColors={[
                          "red",
                          "orange",
                          "#FFCE00",
                          "#FFCE00",
                          "#FFCE00",
                        ]}
                        size={30}
                        onChange={(newValue) => setOpinionStars(newValue)}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        cols={50}
                        value={opinionMessage}
                        onChange={(e) => setOpinionMessage(e.target.value)}
                        placeholder="Enter a description here..."
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></textarea>
                    </div>
                    <div className="mt-5 flex justify-center">
                      <CustomButton
                        title="Add opinion"
                        containerStyles="bg-transparent text-white rounded-full  border border-blue-600 text-primary-blue text-inherit font-bold"
                        btnType="button"
                        isSubmit={false}
                        handleClick={addOpinion}
                      />
                    </div>
                  </WebsiteModal>
                )}
              </div>
              <div className="flex items-center gap-10">
                {opinionsData.map((opinion) => (
                  <div
                    key={opinion.userUid}
                    onClick={() => {
                      setShowModalOpinion(true);
                      setSelectedOpinionDescription(opinion.opinionMessage);
                      setSelectedNumberOfStars(opinion.opinionStars);

                      const userRef = ref(
                        db,
                        `/usersPersonalData/${opinion.userUid}`
                      );
                      get(userRef)
                        .then((userSnapshot) => {
                          if (userSnapshot.exists()) {
                            const userData = userSnapshot.val();
                            const userNickname = userData.userNickname;

                            // Set the user's nickname in the state
                            setSelectedAddedBy(userNickname);
                          }
                        })
                        .catch((error) => {
                          console.error("Error fetching user data:", error);
                        });
                    }}
                    className="flex items-center text-2xl opinionBackground rounded-full  border border-blue-600"
                  >
                    <span>{opinion.opinionStars}</span>
                    <span>
                      <AiFillStar color="yellow" />
                    </span>
                  </div>
                ))}
                {showModalOpinion && (
                  <WebsiteModal onClose={() => setShowModalOpinion(false)}>
                    <div className="opinionContentInModal">
                      <div className="flex gap-1 justify-center text-2xl">
                        {renderStars(selectedNumberOfStars)}
                      </div>
                      <p className="text-1xl mt-5 spaced-paragraph">
                        {selectedOpinionDescription}
                      </p>

                      <p className=" mt-5 flex justify-center">
                        Added by{" "}
                        <span className="text-blue-500 ml-2 font-bold">
                          {" "}
                          {selectedAddedBy}
                        </span>
                      </p>
                    </div>
                  </WebsiteModal>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
