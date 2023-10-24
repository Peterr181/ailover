"use client";
import { useState } from "react";
import { User } from "firebase/auth";
import NavBar from "@/components/Navbar";
import { auth, db } from "../firebase";
import { uid } from "uid";
import React from "react";
import { useSession } from "next-auth/react";
import { ref, set } from "firebase/database";
import useFirebaseData from "@/hooks/useFirebaseData";
type CustomUser = User & {
  updateProfile: (profile: {
    displayName?: string;
    githubLink?: string;
    status?: string;
  }) => Promise<void>;
};
const settings = () => {
  const { data: session } = useSession();
  const { data, loading } = useFirebaseData("/usersPersonalData");

  const user = (auth.currentUser as CustomUser) || null;

  const nickname = user && user.displayName;

  const [userNickname, setUserNickname] = useState("");

  const [status, setStatus] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [description, setDescription] = useState("");
  const [favWebsite, setFavWebsite] = useState("");

  const writeToDatabase = () => {
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
      });
    }
  };

  return (
    <>
      <div className="settingsContainer">
        <NavBar />
        <div className="settingsWrapper">
          <div className="settingsOptions">
            <div className="settingsAvatar">
              <div className="text-center">
                <img
                  src="./upload-photo.png"
                  alt="user avatar"
                  className="userAvatarUpload"
                />
                <p className="uploadPhoto">Upload photo</p>
              </div>
              <div className="settingsInputs">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nickname
                  </label>
                  <input
                    type="email"
                    id="helper-text"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-u"
                    placeholder={nickname ?? ""}
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
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="https://github.com/Peterr181"
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description here..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                </div>
                <div className="settingsButtons">
                  <button className="saveChanges" onClick={writeToDatabase}>
                    Save changes
                  </button>
                  <button className="deleteAccount">Delete account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default settings;
