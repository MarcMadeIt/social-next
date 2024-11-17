"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaPaperclip, FaPhotoFilm, FaRegFaceGrinBeam } from "react-icons/fa6";
import SavedModal from "./SavedModal";
import { useUser, useClerk } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal status
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>("");

  const handleInteraction = () => {
    if (!isSignedIn && !isModalOpen) {
      setIsModalOpen(true); // Mark modal as open
      openSignIn();
    }
  };

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div className="p-2 flex flex-col">
      {/* Top */}
      <div className="flex items-center gap-2 w-full">
        {/* Profile Pic */}
        <div className="w-[15%] md:w-[10%] flex">
          <Image
            src={user?.imageUrl || "/noavatar.png"}
            alt=""
            className="ring-2 ring-foreground rounded-xl w-10 h-10 md:w-16 md:h-16 object-cover"
            width={80}
            height={80}
          />
        </div>
        <form
          action={(formData) => addPost(formData, img?.secure_url || "")}
          className="w-full p-3 flex items-center justify-between gap-1 bg-foreground rounded-lg relative"
        >
          <textarea
            placeholder="What do you have on mind?"
            className="outline-none bg-transparent p-1 resize-none w-[50%] placeholder-placeholder text14 md:text-lg"
            name="desc"
            onFocus={handleInteraction} // Trigger sign-in modal on focus
            onChange={(e) => setDesc(e.target.value)}
          />
          {img && (
            <div className="bg-foreground rounded-lg flex flex-col gap-2 items-center">
              <div className="ring-foreground ring-2 rounded-lg relative w-10 h-10">
                <Image
                  src={img?.secure_url || ""}
                  alt="Cover"
                  objectFit="cover"
                  fill
                />
              </div>
              <span className="text-secondary text11">
                {img.original_filename}.{img.format}
              </span>
            </div>
          )}
          <div className="flex items-center gap-5">
            <FaRegFaceGrinBeam
              className="text-extra cursor-pointer"
              size={20}
              onClick={handleInteraction} // Trigger sign-in modal on click
            />
            <AddPostButton />
          </div>
        </form>
      </div>
      {/* Bottom */}
      <div className="flex">
        <div className="w-[15%] md:w-[10%]"></div>
        {/* Upload Files */}
        <div className="flex items-center text-primary w-[100%] md:w-[90%] gap-2 py-2">
          <CldUploadWidget
            uploadPreset="social-next"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => (
              <div
                className="flex flex-col gap-4 relative items-start cursor-pointer"
                onClick={() => {
                  handleInteraction();
                  if (isSignedIn) open();
                }}
              >
                <div className="flex items-center gap-1 hover:text-secondary duration-300 transition-colors">
                  <FaPhotoFilm />
                  <span className="text12 hover:text-secondary duration-300 transition-colors">
                    Photo/Video
                  </span>
                </div>
              </div>
            )}
          </CldUploadWidget>

          <div className="relative">
            <input type="file" id="file" className="text-[11px]" hidden />
            <label
              htmlFor="file"
              className="flex items-center gap-1 cursor-pointer label-post p-2 hover:text-secondary duration-300 transition-colors"
              onClick={handleInteraction}
            >
              <FaPaperclip />
              <span className="text12">Document</span>
            </label>
          </div>

          <div className="relative z-20">
            <SavedModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
