import React from "react";
import { CustomButtonProps } from "@/types";

const CustomButton = ({
  title,
  handleClick,
  containerStyles,
  btnType,
  isSubmit,
  icon, // Make the icon prop optional
}: CustomButtonProps) => {
  return (
    <button
      disabled={false}
      type={isSubmit ? "submit" : btnType || "button"}
      className={`custom-btn  ${containerStyles}`}
      onClick={handleClick}
    >
      {title}
      {icon && <span className="icon ml-2">{icon}</span>}
    </button>
  );
};

export default CustomButton;
