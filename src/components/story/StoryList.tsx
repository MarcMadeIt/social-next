"use client";

import Image from "next/image";
import { Story, User } from "../../../prisma/generated/client";
import { useOptimistic, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { FaCircleCheck, FaCirclePlus, FaSquarePlus } from "react-icons/fa6";
import { addStory } from "@/lib/actions";
import StoryModal from "./StoryModal";

type StoryWithUser = Story & {
  user: User;
};

interface StoryProp {
  stories: StoryWithUser[];
  userId: string;
}

const StoryList = ({ stories, userId }: StoryProp) => {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { user, isLoaded } = useUser();

  const add = async () => {
    if (!img?.secure_url) return;

    addOptimisticStory({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        username: "Loading...",
        avatar: user?.imageUrl || "/noavatar.png",
        firstname: "",
        surname: "",
        owner: "",
        cover: "",
        desc: "",
        city: "",
        country: "",
        color: "",
        race: "",
        facebook: "",
        instagram: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdStory = await addStory(img.secure_url);
      setStoryList((prev) => [createdStory!, ...prev]);
      setImg(null);
    } catch (err) {
      console.log(err);
    }
  };

  const [opstimisticStory, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="social-next"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col gap-4 items-center relative cursor-pointer ">
              <Image
                className="rounded-xl ring-2 ring-primary lg:hover:ring-secondary duration-500 transition-all w-18 h-28 object-cover"
                src={img?.secure_url || user?.imageUrl || "/noavatar.png"}
                alt=""
                width={80}
                height={60}
                onClick={() => {
                  open();
                }}
              />
              {img ? (
                <>
                  <form action={add}>
                    <button
                      className="btn-light flex flex-col items-center
                    "
                    >
                      <div className="absolute bottom-5 text-2xl text-extra bg-foreground rounded-t-3xl p-1">
                        <FaCircleCheck />
                      </div>
                      <span className="text-primary">Confirm Story</span>
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div
                    className="absolute bottom-5 text-2xl text-primary bg-foreground rounded-t-3xl p-1"
                    onClick={() => {
                      open();
                    }}
                  >
                    <FaCirclePlus />
                  </div>
                  <span className="text-primary">Add Story</span>
                </>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
      {/* Story */}
      {opstimisticStory.map((story) => (
        <div
          className="flex flex-col gap-3 items-center"
          key={story.id}
          onClick={() => openModal(story.img)}
        >
          <Image
            className="rounded-xl ring-2 ring-extra w-18 h-28 object-cover cursor-pointer"
            src={story.img || "/noavatar.png"}
            alt=""
            width={80}
            height={60}
          />
          <p className="text12 text-extra py-1 px-2 bg-foreground rounded-md font-semibold cursor-pointer">
            <span className="text14 leading-3">@</span>
            {story.user?.username}
          </p>
        </div>
      ))}

      {/* Modal */}
      <StoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={selectedImage}
      />
    </>
  );
};

export default StoryList;
