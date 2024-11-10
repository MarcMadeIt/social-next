import React from "react";
import Link from "next/link";
import {
  FaBookmark,
  FaCalendarDay,
  FaClone,
  FaComments,
  FaPeopleGroup,
  FaTags,
} from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import Ads from "../menuRight/Ads";
import ProfileCard from "./ProfileCard";

const MenuLeft = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-5">
      {type === "home" && <ProfileCard />}
      <div className="p-3 flex flex-col gap-5 bg-foreground rounded-xl shadow-xl text-sm">
        <div className="flex-col flex text-primary gap-4">
          <span className="text-secondary">Discover</span>
          <Link
            href="/"
            className="flex gap-2 items-center hover:text-secondary transition-colors duration-300"
          >
            <FaComments />
            Discussions
          </Link>
          <Link
            href="/"
            className="flex gap-2 items-center hover:text-secondary transition-colors duration-300"
          >
            <FaPeopleGroup />
            Communities
          </Link>
          <Link
            href="/"
            className="flex gap-2 items-center hover:text-secondary transition-colors duration-300"
          >
            <FaCalendarDay />
            Events
          </Link>
          <Link
            href="/"
            className="flex gap-2 items-center hover:text-secondary transition-colors duration-300"
          >
            <FaClone />
            Sources
          </Link>
        </div>
        <div className="flex-col flex text-primary gap-4 text-sm">
          <span className="text-secondary">Activity</span>
          <Link
            href="/"
            className="flex gap-2 items-center hover:text-secondary transition-colors duration-300"
          >
            <FaBookmark />
            Saved
          </Link>
          <Link
            href="/"
            className="flex gap-2 items-center hover:text-secondary transition-colors duration-300"
          >
            <FaHistory />
            History
          </Link>
          <Link
            href="/"
            className="flex gap-2 items-center hover:text-secondary transition-colors duration-300"
          >
            <FaTags />
            Tags
          </Link>
        </div>
      </div>
      {type === "profile" && <Ads size="sm" />}
    </div>
  );
};

export default MenuLeft;
