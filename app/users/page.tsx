"use client";
import { Navbar } from "@/components";
import React from "react";
import NavBar from "@/components/Navbar";
import useFirebaseData from "@/hooks/useFirebaseData";
import Loader from "@/components/Loader";
import Link from "next/link";
import { uid } from "uid";
import { auth } from "../firebase";
import { useRouter } from "next/router";

const page = () => {
  const { data, loading } = useFirebaseData("/usersPersonalData");
  const uidd = uid();
  const userUid = auth.currentUser ? auth.currentUser.uid : null;

  const userProfiles = data.map((item) => (
    <div
      id={item.userUid}
      className={`userProfileBox${
        item.userUid === userUid ? " currentUser" : ""
      }`}
      key={item.userUid}
    >
      <Link
        href={item.userUid === userUid ? "/profile" : `/users/${item.userUid}`}
      >
        <img
          src={item.imageUrl}
          alt="user image"
          className="userProfilesImage"
        />
        <p className="mt-5 font-bold">{item.userNickname}</p>
      </Link>
    </div>
  ));
  return (
    <div className="usersContainer">
      <Navbar />
      <div className="usersWrapper text-center ">
        <h1 className="text-4xl font-bold mt-10">Users</h1>
        <p className="text-gray-500 mt-3">
          You have to update your profile informations in settings to make
          AILOVER display you on this list!
        </p>
        {!loading ? (
          <div className="userProfilesContainer">{userProfiles}</div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default page;
