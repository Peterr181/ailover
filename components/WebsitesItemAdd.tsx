import React, { useState, useEffect } from "react";
import { auth, db } from "../app/firebase";

import WebsiteModal from "./WebsiteModal";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";


import { useSelector } from "react-redux";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../app/firebase";

import { useSession } from "next-auth/react";

const WebsitesItem = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [websiteName, setWebsiteName] = useState<string>("");
  let [websiteLink, setWebsiteLink] = useState("");
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [websites, setWebsites] = useState([]);
  const [image, setImage] = useState<File | null>(null);
  const websitesTest = useSelector((state: any) => state.websites.websites);
  const userUid = auth.currentUser ? auth.currentUser.uid : null;



 
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowModal(false);
  };

  const writeToDatabase = async () => {
    if (auth.currentUser) {
      try {
        const userUid = auth.currentUser.uid;
        const uidd = uid();
        if (
          websiteLink &&
          !websiteLink.startsWith("http://") &&
          !websiteLink.startsWith("https://")
        ) {
          websiteLink = `https://${websiteLink}`;
        }

        if (image) {
          const imageRef = storageRef(
            storage,
            `website-images/${userUid}/${uidd}/${image.name}`
          );

          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);

          set(ref(db, `/websites/${uidd}`), {
            websiteName: websiteName,
            websiteDescription: websiteDescription,
            websiteLink: websiteLink,
            imageUrl: imageUrl,
            addedBy: userUid,
          });
          update(ref(db, `/users/${userUid}/websitesAdded`), {
            [uidd]: true,
          });
        } else {
          throw new Error("Image is required.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  

  return (
    <div className="websiteItemAdd ">
      <div className="flex justify-center align-center mt-14">
        {session ? (
          <button
            onClick={() => setShowModal(true)}
            className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add new
          </button>
        ) : (
          <p>Login to add website!</p>
        )}
      </div>

      {showModal && (
        <WebsiteModal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <p className="text-white pb-1">Website name</p>
            <input
              type="search"
              id="search"
              className="text-sm block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Search"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
            />
            <p className="text-white pb-1 pt-3">Website link</p>
            <input
              type="search"
              id="search"
              className="text-sm block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Search"
              value={websiteLink}
              onChange={(e) => setWebsiteLink(e.target.value)}
            />

            <p className="text-white pb-1 pt-3">Website description</p>
            <input
              type="search"
              id="search"
              className="text-sm block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Search"
              value={websiteDescription}
              onChange={(e) => setWebsiteDescription(e.target.value)}
            />
            <p className="text-white pb-1 pt-3">Website image</p>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              className="text-sm block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            />

            <div className="text-center">
              <button
                className="text-center text-white pt-3"
                type="submit"
                onClick={writeToDatabase}
              >
                Add
              </button>
            </div>
          </form>
        </WebsiteModal>
      )}
    </div>
  );
};

export default WebsitesItem;
