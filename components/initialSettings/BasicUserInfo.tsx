import React, { useState } from "react";
import { CustomButton } from "..";
import { uid } from "uid";
import { auth, db } from "@/app/firebase";
import { ref, set } from "firebase/database";
interface BasicUserInfoProps {
  setProgress: (progress: number) => void;
  setActiveStep: (activeStep: number) => void;
}
const BasicUserInfo = ({ setProgress, setActiveStep }: BasicUserInfoProps) => {
  const [userNickname, setUserNickname] = useState("");
  const [status, setStatus] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [description, setDescription] = useState("");
  const [favWebsite, setFavWebsite] = useState("");

  const writeToDatabase = async () => {
    const uidd = uid();
    const userUid = auth.currentUser ? auth.currentUser.uid : null;
    if (auth.currentUser) {
      set(ref(db, `/usersPersonalData/${userUid}`), {
        userNickname: userNickname,
        status: status,
        githubLink: githubLink,
        description: description,
        favWebsite: favWebsite,
        userUid: userUid,
        stars: 0,
        imageUrl: "",
        role: "user",
      });
    }
  };

  const handleContinue = () => {
    setProgress(66.66);
    setActiveStep(3);
    writeToDatabase();
  };
  return (
    <div className=" flex items-center justify-center flex-col">
      <h1 className="font-bold text-3xl">
        Give us some informations about you!
      </h1>
      <div className="settingsInputs mt-10 slide-in">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nickname
          </label>
          <input
            type="email"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-u"
            placeholder="nickname"
            value={userNickname}
            onChange={(e) => setUserNickname(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Favourite AI Website
          </label>
          <input
            type="email"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Chat GPT"
            value={favWebsite}
            onChange={(e) => setFavWebsite(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Status
          </label>
          <input
            type="text"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Student/Developer..."
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Github link
          </label>
          <input
            type="email"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://github.com/Peterr181"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
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
            placeholder="Enter a description here..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mt-2 w-full">
          <CustomButton
            isSubmit={false}
            containerStyles="font-bold bg-blue-500 rounded-xl w-full transition-colors duration-100 hover:bg-blue-400"
            btnType="button"
            title="Continue"
            handleClick={handleContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicUserInfo;
