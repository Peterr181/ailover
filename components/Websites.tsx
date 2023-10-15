"use client";
import React, { useState, useEffect } from "react";
import {
  CustomButton,
  CustomInput,
  CustomSelect,
  WebsitesItem,
  WebsitesItemAdd,
} from ".";
import { websites, websitesData } from "@/constants";
import Link from "next/link";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const Websites = () => {
  const [inputValue, setInputValue] = useState("");
  const websitesDb = useSelector((state: any) => state.websites.websites);
  const [filteredWebsites, setFilteredWebsites] = useState(websitesDb);
  const [isLoading, setIsLoading] = useState(true);
  const filterWebsites = () => {
    const filtered = websitesData.filter((item) =>
      item.websiteName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredWebsites(filtered);
  };
  useEffect(() => {
    // Set filteredWebsites with websitesDb when it becomes available
    setFilteredWebsites(websitesDb);
    setIsLoading(false);
  }, [websitesDb]); // Listen for changes in websitesDb
  const showWebsitesItemAdd = !isLoading;
  return (
    <div className="websitesColor ">
      <div className="max-width pt-[100px] pb-[100px]">
        <div className="textContainer text-center">
          <h1 className=" text-6xl font-bold">Find website</h1>
          <p className="text-gray-500 mt-1 text-xl">
            Choose between multiple websites!
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <div className="">
            <CustomInput
              setInputValue={setInputValue}
              inputValue={inputValue}
              filterWebsites={filterWebsites}
            />
          </div>
        </div>
        <WebsitesItemAdd />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="mt-20 grid grid-cols-4 gap-32 ">
              {filteredWebsites.map((item: any, index: any) => (
                <Link href={item.websiteLink} key={index}>
                  <WebsitesItem
                    image={item.websiteImage}
                    name={item.websiteName}
                    description={item.websiteDescription}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Websites;
