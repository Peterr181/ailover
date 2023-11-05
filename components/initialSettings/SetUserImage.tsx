import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from "..";
import { uid } from "uid";
import { auth, db, storage } from "@/app/firebase";
import { updateProfile } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { ref, set } from "firebase/database";
import { get, update } from "firebase/database";
import Link from "next/link";
interface SetUserImageProps {
  setProgress: (progress: number) => void;
  setActiveStep: (activeStep: number) => void;
}

const SetUserImage = ({ setActiveStep, setProgress }: SetUserImageProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const writeToDatabase = async () => {
    const userUid = auth.currentUser ? auth.currentUser.uid : null;
    if (auth.currentUser) {
      try {
        if (image) {
          const imageRef = storageRef(
            storage,
            `website-images/${userUid}/${uid()}/${image.name}`
          );

          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          setImageUrl(imageUrl);

          const userDataRef = ref(db, `/usersPersonalData/${userUid}`);
          const userDataSnapshot = await get(userDataRef);
          const userData = userDataSnapshot.val();

          userData.imageUrl = imageUrl;

          update(userDataRef, userData);
        }
      } catch (error) {
        console.error("Error updating imageUrl: ", error);
      }
    }
  };
  const handleContinue = () => {
    setProgress(100);
    setActiveStep(3);
    writeToDatabase();
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="font-bold text-3xl">Set your profile avatar!</h1>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Uploaded Image"
          width={450}
          height={450}
          className="mt-10"
        />
      ) : (
        <Image
          src="/upload-photo.png"
          alt="upload photo"
          width={450}
          height={450}
          className="slide-in"
        />
      )}
      <div className="flex gap-3 items-center mt-10">
        <div className="image-input relative littleBg font-bold p-3 rounded-lg ">
          <input
            type="file"
            id="fileInput"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
            className="text-sm block w-full p-2 pl-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          />
          {/* <label
            htmlFor="image-upload"
            className="cursor-pointer text-blue-500 hover:text-blue-600 "
          >
            <i className="fas fa-upload mr-2"></i> Upload Image
          </label> */}
        </div>
        <Link href="/">
          <div className="">
            <CustomButton
              isSubmit={false}
              containerStyles="font-bold bg-blue-500 rounded-xl w-full transition-colors duration-100 hover:bg-blue-400"
              btnType="button"
              title="Continue"
              handleClick={handleContinue}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SetUserImage;
