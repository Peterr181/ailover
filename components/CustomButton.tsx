"use client";

import React from "react";
import Image from "next/image";
import { CustomButtonProps } from "@/types";

const CustomButton = ({
  title,
  handleClick,
  containerStyles,
  btnType,
  isSubmit,
}: CustomButtonProps) => {
  return (
    <button
      disabled={false}
      type={isSubmit ? "submit" : btnType || "button"}
      className={`custom-btn  ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={"flex-1 font-bold "}>{title}</span>
    </button>
  );
};

export default CustomButton;
