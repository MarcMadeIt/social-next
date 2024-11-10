"use client";

import Link from "next/link";
import {
  FaCat,
  FaComments,
  FaHouse,
  FaRegCalendarDays,
  FaSearchengin,
  FaSquarePlus,
} from "react-icons/fa6";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { FaUser } from "react-icons/fa";
import OptionsModal from "./OptionsModal";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { User } from "../../prisma/generated/client";

const Topbar = () => {
  const [petOptions, setPetOptions] = useState(false);

  const handlePawToggle = () => {
    setPetOptions((prevState) => !prevState);
  };

  const handleClose = () => {
    setPetOptions(false);
  };

  return (
    <>
      {petOptions && (
        <div
          className="fixed inset-0 bg-background opacity-80 z-30"
          onClick={handleClose}
        />
      )}
      <div className="h-16 fixed top-0 w-full flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-background z-30 ">
        {/* LEFT */}
        <div className="md:hidden lg:block md:w-[20%]">
          <Link
            className="text-primary text-lg font-bold flex items-center gap-1"
            href="/"
          >
            <FaCat className="text-primary pb-1" size={25} />
            GAMA
          </Link>
        </div>
        {/* CENTER */}
        <div className="hidden md:flex md:w-[50%] gap-6">
          {/* LINKS */}
          <div className="flex gap-6 text-primary">
            <Link className="flex gap-2 items-center" href="/">
              <FaHouse size={18} />
              <span className="text-sm">Home</span>
            </Link>
            <Link className="flex gap-2 items-center" href="/chat">
              <FaComments size={18} />
              <span className="text-sm">Chat</span>
            </Link>
            <Link className="flex gap-2 items-center" href="/calender">
              <FaRegCalendarDays size={18} />
              <span className="text-sm">Calender</span>
            </Link>
            <button
              className=" relative flex gap-2 items-center ring-2 ring-primary p-2 rounded-lg"
              onClick={handlePawToggle}
            >
              <FaSquarePlus size={18} />
              <span className="text-sm">Create</span>
              <OptionsModal show={petOptions} onClose={handlePawToggle} />
            </button>
          </div>
          <div className=" px-2 flex items-center gap-1 bg-foreground rounded-lg ">
            <FaSearchengin className="text-primary" size={20} />
            <input
              placeholder="Search..."
              type="text"
              className="outline-none bg-transparent p-1 placeholder-placeholder w-32"
            />
          </div>
        </div>
        {/* RIGHT */}
        <div className=" md:w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
          <ClerkLoading>
            <div
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-primary"
              role="status"
            >
              {" "}
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode="modal">
                <span className="flex gap-1 items-center text-sm bg-primary p-2 rounded-lg text-background cursor-pointer">
                  <FaUser />
                  Login
                </span>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
          <div className="flex items-center gap-3">
            <SignedIn>
              <div className="text-primary flex items-center">
                <UserButton />
              </div>
            </SignedIn>
            <MobileMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
