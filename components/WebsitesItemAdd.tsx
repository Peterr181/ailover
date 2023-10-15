import React, { useState, useEffect } from "react";
import { auth, db } from "../app/firebase";
import Image from "next/image";
import WebsiteModal from "./WebsiteModal";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { setterWebsites } from "../redux/slices/websitesSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const WebsitesItem = () => {
  const [showModal, setShowModal] = useState(false);
  const [websiteName, setWebsiteName] = useState<string>("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [websites, setWebsites] = useState([]);
  const websitesTest = useSelector((state: any) => state.websites.websites);
  const usersRef = ref(db, "users");
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("Website Name:", websiteName);
    console.log("Website Link:", websiteLink);
    console.log("Website Description:", websiteDescription);

    setShowModal(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (auth.currentUser) {
        onValue(ref(db, `/users`), (snapshot) => {
          setWebsites([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setWebsites((oldArray: any) => [...oldArray, todo]);
            });
          }
        });
      }
    });
  }, []);

  const writeToDatabase = () => {
    const uidd = uid();
    if (auth.currentUser) {
      set(ref(db, `/users/${uidd}`), {
        websiteName: websiteName,
        websiteDescription,
        websiteLink,
        uidd: uidd,
      });
    }
  };

  dispatch(setterWebsites(websites));

  return (
    <div className="websiteItemAdd shadow-md">
      <div className="flex justify-center align-center mt-14">
        <button
          onClick={() => setShowModal(true)}
          className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add new
        </button>
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
