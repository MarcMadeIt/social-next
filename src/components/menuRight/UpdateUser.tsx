"use client";

import React, { useState } from "react";
import { User } from "../../../prisma/generated/client";
import { FaPaintbrush, FaPaw, FaPerson, FaXmark } from "react-icons/fa6";
import Image from "next/image";

const UpdateUser = ({ user }: { user: User }) => {
  // Initialiserer med user.username, og sørger for, at der altid er et '@' foran
  const [open, setOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState("layout"); // Dynamisk valgt sektion
  const [value, setValue] = useState(user.username.startsWith('@') ? user.username : '@' + user.username);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Sørger for, at '@' altid er forrest, og resten kan redigeres
    if (inputValue.startsWith('@')) {
      setValue(inputValue);
    } else {
      setValue('@' + inputValue.replace(/@/g, '')); // Tvinger '@' forrest, hvis det mangler
    }
  };

  return (
    <div>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        Update
      </span>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 ">
          <form action="" className="relative bg-background rounded-xl overflow-hidden shadow-md flex w-full md:w-3/4 xl:w-1/2 h-1/2">
            {/* Venstre side - Valgmuligheder */}
            <div className="left-settings w-[30%] bg-foreground flex flex-col px-5 py-7">
              <h2 className="text-lg font-bold">Update Profile</h2>
              <span className="text-text text11">Manage or change profile details</span>
              <ul className="mt-4 flex flex-col gap-3 text13 text-fade">
                <li
                  onClick={() => setSelectedSetting("layout")}
                  className={`cursor-pointer rounded-md py-2 px-3 flex items-center gap-2 hover:bg-hover ${selectedSetting === "layout" ? "bg-shadow text12 font-semibold text-primary hover:bg-shadow" : ""}`}
                > 
                <FaPaintbrush size={15} />
                  Layout Setup
                </li>
                <li
                  onClick={() => setSelectedSetting("pet")}
                  className={`cursor-pointer rounded-md py-2 px-3 flex items-center gap-2 hover:bg-hover  ${selectedSetting === "pet" ? "bg-shadow text12 font-semibold text-primary hover:bg-shadow" : ""}`}
                >
                  <FaPaw size={15} />
                  Pet Details
                </li>
                <li
                  onClick={() => setSelectedSetting("account")}
                  className={`cursor-pointer rounded-md py-2 px-3 flex items-center gap-2 hover:bg-hover ${selectedSetting === "account" ? "bg-shadow text12 font-semibold text-primary hover:bg-shadow" : ""}`}
                >
                  <FaPerson />
                  Account Settings
                </li>
    
              </ul>
            </div>

            {/* Højre side - Dynamisk indhold */}
            <div className="right-settings w-[70%] bg-dark flex flex-col px-5 py-7">
              {selectedSetting === "layout" && (
                <div className="flex flex-col gap-4">
                    <span className="text14 font-bold">Layout Setup</span>
                    <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                    <div className="flex flex-col gap-2">
                      <label className="block text12 font-medium text-text">Cover Picture</label>
                      <div className="flex justify-between items-center">
                        <div className="ring-foreground ring-2 rounded-md relative w-52 h-24">
                          <Image src={user.cover || "/pawcover2.png"} alt="Cover" objectFit="contain" fill />
                        </div>
                        <div className="flex flex-col gap-2 ">
                          <div className='relative'>
                            <input type="file" id="file" className='text11' hidden  />
                            <label htmlFor="file" className='flex items-center gap-1 cursor-pointer label-post'>
                            <span className="btn cursor-pointer">Change</span>
                            <button className="btn cursor-pointer hidden">Save</button>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                </div>
              )}

              {selectedSetting === "pet" && (
                <div className="flex flex-col gap-4">
                  <span className="text14 font-bold">Pet Settings</span>
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                  <div className="flex flex-col gap-2">
                    <label className="block text12 font-medium text-text">PetName</label>
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        defaultValue={user.firstname || ""}
                        className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md w-52"
                        placeholder={user.firstname || ""}
                        />
                      <button className="btn cursor-pointer">
                        Update
                      </button>

                      </div>

                    </div>
                </div>
              )}

              {selectedSetting === "account" && (
                <div className="flex flex-col gap-4">
                  <span className="text14 font-bold">Account Settings</span>
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                  <div className="flex flex-col gap-2">
                      <label className="block text12 font-medium text-text">Username</label>
                      <div className="flex justify-between items-center">
                          <input
                            type="text"
                            defaultValue={user.username || ""}
                            className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md w-52"
                            value={value}
                            onChange={handleChange}
                          />
                          <button className="btn cursor-pointer">
                            Update
                          </button>
                        </div>
                    </div>
                </div>
              )}

            </div>

            <div onClick={handleClose} className="absolute p-1 hover:bg-foreground cursor-pointer rounded-md right-2 top-3">
              <FaXmark size={22} className="text-text" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
