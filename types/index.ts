import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType: "button" | "submit";
  isSubmit?: boolean;
  icon?: React.ReactNode;
}

export interface WebsitesItemProps {
  image: string;
  name: string;
  description: string;
  link?: string;
  authenticated: boolean;
}
