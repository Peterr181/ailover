import { useState } from "react";
import Link from "next/link";
import { auth } from "../app/firebase";

import { useSession, signOut } from "next-auth/react";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineArrowDown,
} from "react-icons/ai";

import { IoMdNotificationsOutline } from "react-icons/io";

import { IoNotifications, IoSettingsOutline } from "react-icons/io5";
import useFirebaseData from "@/hooks/useFirebaseData";

const NavBar = () => {
  const { data: session } = useSession();
  const userUid = auth.currentUser ? auth.currentUser.uid : null;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const { data, loading } = useFirebaseData("/usersPersonalData");
  const currentUserWebsites = data.filter((user) => user.userUid === userUid);

  const user = auth.currentUser;
  const userNickname = currentUserWebsites[0]?.userNickname;

  return (
    <header className="w-full   z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <p className="font-bold text-white">AILOVER</p>
        </Link>

        {!session && (
          <Link href="/signup">
            <CustomButton
              title="Sign in"
              btnType="button"
              containerStyles="bg-blue-600 font-bold text-white rounded-full hover:bg-blue-800 transition "
            />
          </Link>
        )}
        {session && (
          <>
            <div className="flex items-center">
              <Link href="/websites">
                <div className="otherNavElements mr-5">
                  <div className="w-full">
                    <div className="flex items-center  cursor-pointer">
                      <div className="flex-grow pl-4">Websites</div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/users">
                <div className="otherNavElements mr-5">
                  <div className="w-full">
                    <div className="flex items-center  cursor-pointer">
                      <div className="flex-grow pl-4">Users</div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/notifications">
                <div className="otherNavElements mr-8 ml-8">
                  <div className="w-full">
                    <div className="flex items-center  cursor-pointer">
                      <IoNotifications size={25} />
                    </div>
                  </div>
                </div>
              </Link>
              <div className="userProfileContainer">
                <div>
                  {/* <span className="pr-3">{userNickname}</span> */}
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <img
                      src={
                        currentUserWebsites[0]?.imageUrl || "./user-avatar.png"
                      }
                      alt="user profile"
                      className="userAvatar"
                    />
                    <button id="dropdownDefaultButton" type="button">
                      <AiOutlineArrowDown />
                    </button>
                  </div>
                  <div
                    id="dropdown"
                    className={`z-10 p-2  ${
                      isDropdownOpen ? "block" : "hidden"
                    }  rounded-lg shadow w-44 absolute mt-2 border-blue-500 border bg-transparent `}
                    role="menu"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <ul className=" text-gray-700 dark:text-gray-200 text-1xl font-bold">
                      <Link href="/">
                        <div className="w-full">
                          <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                            <div className="block px-4 py-2 cursor-pointer">
                              <AiOutlineHome />
                            </div>
                            <div className="flex-grow pl-4">Home</div>
                          </div>
                        </div>
                      </Link>
                      <Link href="/profile">
                        <div className="w-full">
                          <div className="flex items-center hover-bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                            <div className="block px-4 py-2 cursor-pointer">
                              <AiOutlineUser />
                            </div>
                            <div className="flex-grow pl-4">Profile</div>
                          </div>
                        </div>
                      </Link>
                      <Link href="/settings">
                        <div className="w-full">
                          <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                            <div className="block px-4 py-2 cursor-pointer">
                              <IoSettingsOutline />
                            </div>
                            <div className="flex-grow pl-4">Settings</div>
                          </div>
                        </div>
                      </Link>
                      <div className="w-full">
                        <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                          <div
                            onClick={() => signOut()}
                            className="block px-4 py-2 cursor-pointer"
                          >
                            <AiOutlineLogout />
                          </div>
                          <div
                            className="flex-grow pl-4"
                            onClick={() => signOut()}
                          >
                            Sign out
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
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
