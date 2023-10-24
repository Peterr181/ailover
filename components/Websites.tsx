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
interface Website {
  websiteName: string;
  websiteDescription: string;
  imageUrl: string;
  websiteLink: string;
}
const Websites = () => {
  const [inputValue, setInputValue] = useState("");
  const websitesDb = useSelector((state: any) => state.websites.websites);

  const [filteredWebsites, setFilteredWebsites] = useState(websitesDb);
  const [isLoading, setIsLoading] = useState(true);
  const filterWebsites = () => {
    const filtered = websitesDb.filter((item: Website) =>
      item.websiteName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredWebsites(filtered);
  };
  useEffect(() => {
    setFilteredWebsites(websitesDb);
    setIsLoading(false);
  }, [websitesDb]);
  const showWebsitesItemAdd = !isLoading;
  return (
    <section className="websitesColor" id="websitesSection">
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
                <Link
                  href={item.websiteLink && item.websiteLink}
                  key={index}
                  target="_blank"
                >
                  <WebsitesItem
                    image={item.imageUrl}
                    name={item.websiteName}
                    description={item.websiteDescription}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Websites;
