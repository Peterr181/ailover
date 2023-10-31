import { useState } from "react";
import Link from "next/link";
import { auth } from "../app/firebase";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineUser,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
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

  console.log(data);

  const nickname = user && user.displayName;
  const status = user && user.phoneNumber;

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
                src={currentUserWebsites[0]?.imageUrl || "./user-avatar.png"}
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
                  <AiOutlineArrowDown />
                </button>
                <div
                  id="dropdown"
                  className={`z-10 p-2  ${
                    isDropdownOpen ? "block" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute mt-2 dropdownhehe`}
                  role="menu"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <ul className=" text-gray-700 dark:text-gray-200 text-1xl font-bold">
                    <div className="w-full">
                      <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                        <div
                          onClick={() => router.push("/")}
                          className="block px-4 py-2 cursor-pointer"
                        >
                          <AiOutlineHome />
                        </div>
                        <div
                          className="flex-grow pl-4"
                          onClick={() => router.push("/")}
                        >
                          Home
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex items-center hover-bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                        <div
                          onClick={() => router.push("/profile")}
                          className="block px-4 py-2 cursor-pointer"
                        >
                          <AiOutlineUser />
                        </div>
                        <div
                          className="flex-grow pl-4"
                          onClick={() => router.push("/profile")}
                        >
                          Profile
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                        <div
                          onClick={() => router.push("/settings")}
                          className="block px-4 py-2 cursor-pointer"
                        >
                          <IoSettingsOutline />
                        </div>
                        <div
                          className="flex-grow pl-4"
                          onClick={() => router.push("/settings")}
                        >
                          Settings
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                        <div
                          onClick={() => router.push("/users")}
                          className="block px-4 py-2 cursor-pointer"
                        >
                          <FiUsers />
                        </div>
                        <div
                          className="flex-grow pl-4"
                          onClick={() => router.push("/users")}
                        >
                          Users
                        </div>
                      </div>
                    </div>
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
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
