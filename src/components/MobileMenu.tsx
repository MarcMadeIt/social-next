import { ClerkLoaded, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { FaBell, FaEllipsisVertical } from "react-icons/fa6";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <ClerkLoaded>
        <SignedIn>
          <div
            className="flex gap-[4.5px] cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <FaEllipsisVertical className="text-primary" size={24} />
          </div>
          {isOpen && (
            <div className="p-1 absolute right-0 top-10 ring-2 ring-background rounded-xl bg-foreground flex flex-col items-center justify-center gap-2 font-normal z-10 text13 text-primary">
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-secondary duration-300 transition-colors w-32 p-1"
              >
                <Image src="/uk.png" alt="" width={15} height={15} />
                English
              </Link>
              <Link
                href="/"
                className="hover:text-secondary duration-300 transition-colors w-32 p-1 flex gap-2 items-center"
              >
                <FaBell />
                Notifications
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 hover:text-secondary duration-300 transition-colors w-32 p-1"
              >
                <FaCog />
                Settings
              </Link>
              <SignOutButton>
                <span className="text-sm flex items-center gap-2 cursor-pointer hover:text-secondary duration-300 transition-colors w-32 p-1">
                  <FaSignOutAlt />
                  Log out
                </span>
              </SignOutButton>
            </div>
          )}
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
};

export default MobileMenu;
