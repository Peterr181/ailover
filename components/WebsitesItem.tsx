import React from "react";
import Image from "next/image";
import { WebsitesItemProps } from "@/types";
import useFirebaseData from "@/hooks/useFirebaseData";
import waitingImage from "../../nextjsfirst/public/queue.webp";

const WebsitesItem = ({
  image,
  name,
  description,
  link,
  authenticated,
}: WebsitesItemProps) => {
  const { data, loading } = useFirebaseData("/websites");

  return (
    <div className="websiteItem shadow-md text-center">
      <div className="imageHeader">
        {authenticated ? (
          <Image src={image} width={200} height={200} alt="aiwebsitelogo" />
        ) : (
          <Image
            src={waitingImage}
            width={200}
            height={200}
            alt="aiwebsitelogo"
          />
        )}
        {authenticated ? (
          <h2 className="font-bold mt-5">{name}</h2>
        ) : (
          <div>
            <h2 className="font-bold mt-5 mb-5">{name}</h2>
            <span className="bg-red-600 p-2 rounded-2xl">NOT APPROVED</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsitesItem;
