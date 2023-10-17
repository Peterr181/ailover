"use client";
import Image from "next/image";
import { Hero } from "@/components";
import { redirect } from "next/navigation";
import { Roboto } from "@next/font/google";
import Websites from "@/components/Websites";
import { signOut, useSession } from "next-auth/react";
import { Navbar } from "@/components";
import { Discord } from "@/components";
import { Footer } from "@/components/Footer";

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
        <Navbar />
        <Hero />
      </main>
      <div className="secondContent">
        <Websites />
        <Discord />
        <Footer />
      </div>
      {/* {session?.data?.user?.email} */}
    </>
  );
}

Home.requireAuth = true;
