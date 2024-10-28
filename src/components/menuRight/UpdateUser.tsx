"use client";

import React, { useActionState, useState } from "react";
import { User } from "../../../prisma/generated/client";
import { FaPaintbrush, FaPaw, FaPerson, FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { updateProfile } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState("layout");
  const [value, setValue] = useState(
    user.username.startsWith("@") ? user.username : "@" + user.username
  );
  const [cover, setCover] = useState<any>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.startsWith("@")) {
      setValue(inputValue);
    } else {
      setValue("@" + inputValue.replace(/@/g, ""));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract form data and pass it to updateProfile
    const formData = new FormData(event.currentTarget);

    const result = await updateProfile(formData, cover);

    if (result !== "err") {
      window.location.reload();
    } else {
      console.error("Failed to update profile");
    }
  };

  return (
    <div>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        Update
      </span>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 ">
          <div className="relative bg-background rounded-xl overflow-hidden shadow-md flex w-full md:w-3/4 xl:w-1/2 h-2/3">
            {/* Venstre side - Valgmuligheder */}
            <div className="left-settings w-[30%] bg-foreground flex flex-col px-5 py-7">
              <h2 className="text-lg font-bold">Update Profile</h2>
              <span className="text-text text11">
                Manage or change profile details
              </span>
              <ul className="mt-4 flex flex-col gap-3 text13 text-fade">
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
            <div className="right-settings w-[70%] bg-dark flex flex-col px-5 py-7">
              {selectedSetting === "layout" && (
                <div className="flex flex-col gap-4">
                  <span className="text14 font-bold">Layout Setup</span>
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                  <form
                    className="flex flex-col gap-2"
                    action={(formData) =>
                      updateProfile(formData, cover?.secure_url)
                    }
                  >
                    <label className="block text12 font-medium text-text">
                      Cover Picture
                    </label>

                    <CldUploadWidget
                      uploadPreset="social-next"
                      onSuccess={(result) => setCover(result.info)}
                    >
                      {({ open }) => {
                        return (
                          <div className="flex justify-between items-center">
                            <div className="ring-foreground ring-2 rounded-md relative w-52 h-24">
                              <Image
                                src={
                                  cover?.secure_url ||
                                  user.cover ||
                                  "/pawcover2.png"
                                }
                                alt="Cover"
                                objectFit="contain"
                                fill
                              />
                            </div>
                            <div className="flex flex-col gap-2 ">
                              <div className="relative">
                                {/* <input
                                  type="file"
                                  id="file"
                                  className="text11"
                                  hidden
                                  name="cover"
                                />*/}
                                <label
                                  htmlFor="file"
                                  className="flex items-center gap-1 cursor-pointer label-post"
                                >
                                  <span
                                    className="btn cursor-pointer"
                                    onClick={() => open()}
                                  >
                                    Change
                                  </span>
                                  <button className="btn cursor-pointer">
                                    Save
                                  </button>
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    </CldUploadWidget>
                  </form>
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                </div>
              )}

              {selectedSetting === "pet" && (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <span className="text14 font-bold">Pet Details</span>
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="block text12 font-medium text-text">
                        Pet name
                      </label>
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md "
                          placeholder={user.firstname || ""}
                          name="firstname"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text12 font-medium text-text">
                        Owner name
                      </label>
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md "
                          placeholder={user.owner || ""}
                          name="owner"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="block text12 font-medium text-text">
                        City
                      </label>
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
                          placeholder={user.city || ""}
                          name="city"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text12 font-medium text-text">
                        Country
                      </label>
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md "
                          placeholder={user.country || ""}
                          name="country"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="block text12 font-medium text-text">
                        Race
                      </label>
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
                          placeholder={user.race || "fx. Persian"}
                          name="race"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="block text12 font-medium text-text">
                        Color
                      </label>
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
                          placeholder={user.color || "fx. White"}
                          name="color"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text12 font-medium text-text">
                      Desc
                    </label>
                    <div className="flex justify-between items-center">
                      <textarea
                        className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md resize-none
                        w-80 h-32"
                        placeholder={user.desc || "Tell about yourself..."}
                        name="desc"
                      />
                    </div>
                  </div>
                  <button className="btn cursor-pointer w-20" type="submit">
                    Update
                  </button>
                </form>
              )}

              {selectedSetting === "account" && (
                <div className="flex flex-col gap-4">
                  <span className="text14 font-bold">Account Settings</span>
                  <hr className="h-0 w-full border-1 border-shadow rounded-md" />
                  <div className="flex flex-col gap-2">
                    <label className="block text12 font-medium text-text">
                      Username
                    </label>
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md w-52"
                        value={value}
                        onChange={handleChange}
                      />
                      <button className="btn cursor-pointer">Update</button>
                    </div>
                  </div>
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
