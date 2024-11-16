"use client";

import React, { useActionState, useState } from "react";
import { User } from "../../../../prisma/generated/client";
import { FaPaintbrush, FaPaw, FaPerson, FaXmark } from "react-icons/fa6";
import { updateProfile } from "@/lib/actions";
import UpdateLayout from "./updateLayout/UpdateLayout";
import UpdateProfile from "./updateProfile/UpdateProfile";
import { useRouter } from "next/navigation";
import UpdateButton from "../UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState("layout");
  const [value, setValue] = useState(
    user.username.startsWith("@") ? user.username : "@" + user.username
  );

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    router.refresh();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(
      inputValue.startsWith("@")
        ? inputValue
        : "@" + inputValue.replace(/@/g, "")
    );
  };

  return (
    <div>
      <span
        onClick={() => setOpen(true)}
        className="cursor-pointer btn-cta-light"
      >
        Update
      </span>
      {open && (
        <div className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <div className="relative bg-background rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row w-full md:w-3/4 xl:w-1/2 h-full md:h-[95%]  overflow-y-auto md:overflow-y-hidden">
            {/* Venstre side - Valgmuligheder */}
            <div className=" w-[100%] md:w-[30%] bg-foreground flex flex-col py-5 px-5 md:py-7">
              <h2 className="text-lg font-bold">Update Profile</h2>
              <span className="text-text text11">
                Manage or change profile details
              </span>
              <ul className="mt-4 flex md:flex-col gap-3 text13 text-fade">
                <li
                  onClick={() => setSelectedSetting("layout")}
                  className={`cursor-pointer rounded-md py-2 px-3 flex items-center gap-2 hover:bg-hover ${
                    selectedSetting === "layout"
                      ? "bg-shadow text12 font-semibold text-primary hover:bg-shadow"
                      : ""
                  }`}
                >
                  <FaPaintbrush size={15} />
                  Layout Setup
                </li>
                <li
                  onClick={() => setSelectedSetting("pet")}
                  className={`cursor-pointer rounded-md py-2 px-3 flex items-center gap-2 hover:bg-hover  ${
                    selectedSetting === "pet"
                      ? "bg-shadow text12 font-semibold text-primary hover:bg-shadow"
                      : ""
                  }`}
                >
                  <FaPaw size={15} />
                  Pet Details
                </li>
                <li
                  onClick={() => setSelectedSetting("account")}
                  className={`cursor-pointer rounded-md py-2 px-3 flex items-center gap-2 hover:bg-hover ${
                    selectedSetting === "account"
                      ? "bg-shadow text12 font-semibold text-primary hover:bg-shadow"
                      : ""
                  }`}
                >
                  <FaPerson />
                  Account Settings
                </li>
              </ul>
            </div>

            {/* Højre side - Dynamisk indhold */}
            <div className=" w-[100%] md:w-[70%] bg-dark flex flex-col px-5 py-7">
              {selectedSetting === "layout" && (
                <div className="flex flex-col gap-4">
                  <span className="text14 font-bold">Layout Setup</span>
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                  <UpdateLayout user={user} />
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                </div>
              )}

              {selectedSetting === "pet" && (
                <div className="flex flex-col gap-4">
                  <span className="text14 font-bold">Pet Details</span>
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                  <UpdateProfile user={user} />
                </div>
              )}

              {selectedSetting === "account" && (
                <div className="flex flex-col gap-4">
                  <span className="text14 font-bold">Account Settings</span>
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                  <form
                    action={(formData) => formAction({ formData })}
                    className="flex flex-col gap-2 items-start"
                  >
                    <label className="block text12 font-medium text-text">
                      Username
                    </label>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-5 md:items-center relative">
                      <input
                        type="text"
                        className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md w-52"
                        value={value}
                        onChange={handleChange}
                      />
                      <div className="absolute -right-10 -bottom-12 md:-bottom-5 md:right-auto">
                        {state.success && (
                          <span className="text11 text-extra px-2">
                            Username has been updated
                          </span>
                        )}
                        {state.error && (
                          <span className="text11 text-red-900 px-2">
                            Username didn't update!
                          </span>
                        )}
                      </div>
                      <UpdateButton />
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div
              onClick={handleClose}
              className="absolute p-1 hover:bg-foreground cursor-pointer rounded-md right-2 top-3"
            >
              <FaXmark size={22} className="text-text" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
