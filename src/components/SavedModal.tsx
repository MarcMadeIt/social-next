"use client";

import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

const SavedModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="flex items-center gap-1 cursor-pointer p-2 hover:text-secondary duration-300 transition-colors"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {isOpen ? <FaBookmark /> : <FaRegBookmark />}
      <span className="text12">Saved</span>

      {isOpen && (
        <div className="bg-background absolute w-[220px] right-0 top-10 rounded-xl font-medium z-4 text-sm">
          <div className="flex flex-wrap w-full gap-2 p-2">
            <div className="bg-background rounded-lg w-24 h-24 flex flex-col justify-between border-2 border-placeholder p-2">
              <span className="font-bold text-secondary">Event</span>
              <p className="text-[12px]">Pet Fun</p>
              <span className="text11">1/24/2027</span>
            </div>
            <div className="bg-background rounded-lg w-24 h-24 flex flex-col justify-between border-2 border-placeholder p-2">
              <span className="font-bold text-secondary">Service</span>
              <p className="text-[12px]">Feeding</p>
              <span className="text11">7/27/2113</span>
            </div>
            <div className="bg-background rounded-lg w-24 h-24 flex flex-col justify-between border-2 border-placeholder p-2">
              <span className="font-bold text-secondary">Service</span>
              <p className="text-[12px]">Take a walk</p>
              <span className="text11">6/8/2047</span>
            </div>
            <div className="bg-background rounded-lg w-24 h-24 flex flex-col justify-between border-2 border-placeholder p-2">
              <span className="font-bold text-secondary">Service</span>
              <p className="text-[12px]">Take a walk</p>
              <span className="text11">6/8/2047</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedModal;
