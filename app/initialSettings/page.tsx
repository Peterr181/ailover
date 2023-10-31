"use client";
import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Image from "next/image";
import { CustomButton } from "@/components";
import SocialMediasInfo from "@/components/initialSettings/SocialMediasInfo";
import BasicUserInfo from "@/components/initialSettings/BasicUserInfo";
import SetUserImage from "@/components/initialSettings/SetUserImage";

const page = () => {
  const [progress, setProgress] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(1);
  return (
    <>
      <div className="initialSettings">
        <div className="mt-20 max-w-screen-2xl mx-auto">
          <ProgressBar
            completed={progress}
            bgColor="rgb(59 130 246)"
            maxCompleted={100}
          />
        </div>
        <div className=" mt-20 max-w-3xl mx-auto">
          {activeStep === 1 && (
            <SocialMediasInfo
              setProgress={setProgress}
              setActiveStep={setActiveStep}
            />
          )}
          {activeStep === 2 && (
            <BasicUserInfo
              setActiveStep={setActiveStep}
              setProgress={setProgress}
            />
          )}
          {activeStep === 3 && (
            <SetUserImage
              setActiveStep={setActiveStep}
              setProgress={setProgress}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default page;
