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
      <div>
        {/* <Image src={image} width={200} height={200} alt="aiwebsitelogo" /> */}
        <span className="text-blue-600">{name}</span>
      </div>
      <div className="text-center p-5 font-bold">
        <span className="">{description}</span>
      </div>
    </div>
  );
};

export default WebsitesItem;
