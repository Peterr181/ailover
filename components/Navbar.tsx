import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";

const NavBar = () => (
  <header className="w-full  absolute z-10">
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
      <Link href="/" className="flex justify-center items-center">
        <p className="font-bold text-white">AILOVER</p>
      </Link>

      <Link href="/register">
        <CustomButton
          title="Sign in"
          btnType="button"
          containerStyles="bg-blue-600 text-white rounded-full hover:bg-blue-800 transition "
        />
      </Link>
    </nav>
  </header>
);

export default NavBar;
