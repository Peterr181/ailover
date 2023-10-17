import { useState } from "react";
import Link from "next/link";
import { auth } from "../app/firebase";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import CustomButton from "./CustomButton";

const NavBar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const user = auth.currentUser;

  const nickname = user && user.displayName;

  return (
    <header className="w-full  absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <p className="font-bold text-white">AILOVER</p>
        </Link>

        {!session && (
          <Link href="/register">
            <CustomButton
              title="Sign in"
              btnType="button"
              containerStyles="bg-blue-600 text-white rounded-full hover:bg-blue-800 transition "
            />
          </Link>
        )}
        {session && (
          // <Link href="/register" onClick={() => signOut()}>
          //   <CustomButton
          //     title="Sign out"
          //     btnType="button"
          //     containerStyles="bg-blue-600 text-white rounded-full hover:bg-blue-800 transition "
          //   />
          // </Link>
          <>
            <div className="userProfileContainer">
              <img
                src="user-avatar.png"
                alt="user profile"
                className="userAvatar"
              />
              <div>
                <span className="pr-3">{nickname}</span>
                <button
                  id="dropdownDefaultButton"
                  onClick={toggleDropdown}
                  type="button"
                >
                  <img
                    src="down-arrow.png"
                    alt="down arrow"
                    className="downArrow"
                  />
                </button>
                <div
                  id="dropdown"
                  className={`z-10 ${
                    isDropdownOpen ? "block" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-lg shadow w-44  absolute mt-2 dropdownhehe`}
                  role="menu"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <ul className="py-2  text-gray-700 dark:text-gray-200 text-1xl ">
                    <li className="w-full">
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/settings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/earnings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li className="">
                      <button
                        onClick={() => signOut()}
                        className="w-full  text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
