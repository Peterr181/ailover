"use client";
import Image from "next/image";
import { Hero } from "@/components";
import { redirect } from "next/navigation";
import { Roboto } from "@next/font/google";
import Websites from "@/components/Websites";
import { signOut, useSession } from "next-auth/react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const backgroundImageUrl = "/hero.jpg";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  return (
    <>
      <main
        className={`overflow-hidden h-screen ${roboto.className}  `}
        style={backgroundStyle}
      >
        <Hero />
      </main>
      <Websites />
      {session?.data?.user?.email}
      <button onClick={() => signOut()}>LogoutHaha</button>
    </>
  );
}

Home.requireAuth = true;
