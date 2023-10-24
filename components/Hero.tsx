import React from "react";
import { CustomButton } from ".";

import Link from "next/link";
import { useSession } from "next-auth/react";

const Hero = () => {
  const handleScroll = () => {};
  const { data: session } = useSession();

  return (
    <>
      <div className="hero  bg-line-b nk-mask">
        <div className="flex-1 pt-36 padding-x flex flex-col items-center justify-center">
          <h1 className="hero__title text-center">
            Discover the world of AI your gateway to the{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">
              future
            </span>
          </h1>
          <p className="text-gray-500 text-center mt-3 text-xl">
            Unlock the Power of Artificial Intelligence with Our Curated
            Collection of Websites and Resources. Don't wait too much, just test
            it by yourself!
          </p>
          {session ? (
            <>
              <a href="#websitesSection">
                <CustomButton
                  title="Explore"
                  containerStyles="bg-transparent text-white rounded-full mt-10 border border-blue-600 text-primary-blue text-inherit"
                  handleClick={handleScroll}
                  btnType="button"
                  isSubmit={false}
                />
              </a>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Hero;
