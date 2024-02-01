"use client";
import { useState } from "react";
import { User, updateProfile } from "firebase/auth";
import NavBar from "@/components/Navbar";
import { auth, db, storage } from "../firebase";
import { uid } from "uid";
import React from "react";
import { useSession } from "next-auth/react";
import { get, ref, set, update } from "firebase/database";
import useFirebaseData from "@/hooks/useFirebaseData";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
type CustomUser = User & {
  updateProfile: (profile: {
    displayName?: string;
    githubLink?: string;
    status?: string;
  }) => Promise<void>;
};
const settings = () => {
  const user = (auth.currentUser as CustomUser) || null;
  const [image, setImage] = useState<File | null>(null);
  const nickname = user && user.displayName;

  const [userNickname, setUserNickname] = useState("");

  const [status, setStatus] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [description, setDescription] = useState("");
  const [favWebsite, setFavWebsite] = useState("");
  const [firstTimeLoad, setFirstTimeLoad] = useState(true);

  const writeToDatabase = async () => {
    const uidd = uid();
    const userUid = auth.currentUser ? auth.currentUser.uid : null;
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: userNickname });
        if (image) {
          const imageRef = storageRef(
            storage,
            `website-images/${userUid}/${uidd}/${image.name}`
          );

          await uploadBytes(imageRef, image);

          const imageUrl = await getDownloadURL(imageRef);
        }
        const userDataRef = ref(db, `/usersPersonalData/${userUid}`);
        const userDataSnapshot = await get(userDataRef);
        const userData = userDataSnapshot.val();

        if (userNickname !== "") {
          userData.userNickname = userNickname;
        }
        if (favWebsite !== "") {
          userData.favoriteWebsite = favWebsite;
        }
        if (status !== "") {
          userData.status = status;
        }
        if (githubLink !== "") {
          userData.githubLink = githubLink;
        }
        if (description !== "") {
          userData.description = description;
        }

        update(userDataRef, userData);
      } catch (error) {
        console.error("Error updating user data: ", error);
      }
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
                <label htmlFor="fileInput" className="userAvatarUploadLabel">
                  <img
                    src="./upload-photo.png"
                    alt="user avatar"
                    className="userAvatarUpload"
                  />
                </label>

                <input
                  type="file"
                  style={{ display: "none" }}
                  id="fileInput"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                  className="text-sm block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                />
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
