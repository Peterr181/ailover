import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from "@/components";

interface SocialMediasInfo {
  setProgress: (progress: number) => void;
  setActiveStep: (activeStep: number) => void;
}

const SocialMediasInfo = ({ setProgress, setActiveStep }: SocialMediasInfo) => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleSelectMedia = (media: any) => {
    setSelectedMedia(media);
  };

  const handleContinue = () => {
    if (selectedMedia) {
      setProgress(33.33);
      setActiveStep(2);
    } else {
      alert("Please select a social media image before continuing.");
    }
  };

  const socialMediaData = [
    {
      name: "Socials",
      imageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/9eb3a5707704c76b653a5e85fbf9ca0e.svg",
    },
    {
      name: "Google",
      imageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/8e3f5e058dd4dd5eb43646c2d1f19b3c.svg",
    },
    {
      name: "Youtube",
      imageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/5ae4d4bc2af930b5bc002b5d0b7cbad7.svg",
    },
    {
      name: "Television",
      imageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/b2a0faf7b835cf2ab9a75afe033fdad9.svg",
    },
    {
      name: "News",
      imageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/0d0c3c81ccd1fd2ea84371e6bf4546b3.svg",
    },
    {
      name: "Tiktok",
      imageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/f2969a78ee365da5e7676dc6afd8c1b4.svg",
    },
    {
      name: "Friends",
      imageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/947546a876aaea3a9811abf4cca1b618.svg",
    },
    {
      name: "Other",
      imageUrl:
        "https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/d4419d84cb57b1295591e05cd60e45fb.svg",
    },
  ];

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="font-bold text-3xl">How do you know about AILOVER?</h1>
      <div className="mt-10 grid grid-cols-4 gap-10">
        {socialMediaData.map((data, index) => (
          <div
            key={index}
            className={`p-8 rounded-2xl shadow-md cursor-pointer transition-transform transform hover:scale-105 littleBg slide-in ${
              selectedMedia === data.name ? "border-4 border-blue-500" : ""
            } ${selectedMedia === data.name ? "selected" : ""}`}
            onClick={() => handleSelectMedia(data.name)}
          >
            <Image
              width={100}
              height={100}
              src={data.imageUrl}
              alt="social website image"
            />
            <p className="text-center mt-2 font-bold">{data.name}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 w-full">
        <CustomButton
          isSubmit={false}
          containerStyles="font-bold bg-blue-500 rounded-xl w-full transition-colors duration-100 hover:bg-blue-400"
          btnType="button"
          title="Continue"
          handleClick={handleContinue}
        />
      </div>
    </div>
  );
};

export default SocialMediasInfo;
