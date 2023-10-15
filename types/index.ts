import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType: "button" | "submit";
  isSubmit?: boolean;
}

export interface WebsitesItemProps {
  image: string;
  name: string;
  description: string;
  link?: string;
}
