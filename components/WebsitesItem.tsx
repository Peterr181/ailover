import React from "react";
import Image from "next/image";
import { WebsitesItemProps } from "@/types";

const WebsitesItem = ({
  image,
  name,
  description,
  link,
}: WebsitesItemProps) => {
  return (
    <div className="websiteItem shadow-md text-center">
      <div className="imageHeader">
        <Image src={image} width={200} height={200} alt="aiwebsitelogo" />
        <h2 className="font-bold mt-5">{name}</h2>
      </div>
      {/* <div className="text-center p-5 font-bold">
        <span className="">{description}</span>
      </div> */}
    </div>
  );
};

export default WebsitesItem;
