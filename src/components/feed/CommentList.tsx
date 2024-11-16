"use client";

import Image from "next/image";
import React, { useOptimistic, useState } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegCommentDots, FaRegFaceGrinBeam } from "react-icons/fa6";
import { IoPawOutline } from "react-icons/io5";
import { Comment, User } from "../../../prisma/generated/client";
import { useUser } from "@clerk/nextjs";
import { addComment } from "@/lib/actions";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, SetCommentState] = useState(comments);
  const [desc, setDesc] = useState("");
  const [showAll, setShowAll] = useState(false);

  const add = async () => {
    if (!user || !desc) return;

    setOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noavatar.png",
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
      const createdComment = await addComment(postId, desc);
      SetCommentState((prev) => [createdComment, ...prev]);
    } catch (err) {}
  };

  const [optimisticComment, setOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  // Vis kun de to seneste kommentarer, hvis showAll er false
  const commentsToDisplay = showAll
    ? optimisticComment
    : optimisticComment.slice(0, 1);

  return (
    <>
      {commentsToDisplay.map((comment) => (
        <div
          className="text12 px-2 pb-2 flex flex-col gap-2 p-3 "
          key={comment.id}
        >
          <div className="flex items-cente gap-2">
            <div className="w-6 h-6 md:w-7 md:h-7 relative">
              <Image
                src={comment.user.avatar || "/noavatar.png"}
                alt=""
                className="object-cover rounded-md"
                fill
              />
            </div>
            <p className="text13 text-extra py-1 px-2 bg-user rounded-md font-semibold cursor-pointer ">
              <span className="text-lg leading-3 cursor-pointer ">@</span>
              {comment.user.username}
            </p>
            <span className="font-medium text13 md:text-base">
              {comment.user.firstname || ""}
            </span>
          </div>
          <p className="text-text">{comment.desc}</p>
          <div className="flex text12 gap-6 text-primary">
            <div className="flex items-center gap-1 cursor-pointer ">
              <span className="font-medium">0</span>
              <hr className="h-4 w-0 border-[1px] border-solid border-placeholder rounded-md" />
              <IoPawOutline />
              <span>Paw</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaRegCommentDots />
              <span>Reply</span>
            </div>
          </div>
        </div>
      ))}
      {!showAll && optimisticComment.length > 2 && (
        <span
          className="text13 text-extra cursor-pointer"
          onClick={() => setShowAll(true)}
        >
          Show all comments
        </span>
      )}
      {showAll && (
        <span
          className="text13 text-extra cursor-pointer"
          onClick={() => setShowAll(false)}
        >
          Show less
        </span>
      )}

      {user && (
        <div className="flex items-center gap-4">
          <div className="w-5 h-5 relative">
            <Image
              src={user?.imageUrl || "/noavatar.png"}
              alt=""
              fill
              className=" rounded-md object-cover"
            />
          </div>
          <form action={add} className="flex gap-6 w-2/4 ">
            <div className=" relative bg-background rounded-lg w-full">
              <input
                className=" bg-transparent text13 placeholder-placeholder p-2 border-none outline-none w-[80%] "
                placeholder="Write a comment..."
                name=""
                id=""
                onChange={(e) => setDesc(e.target.value)}
              />
              <FaRegFaceGrinBeam
                className="text-extra absolute right-2 bottom-2 cursor-pointer"
                size={18}
              />
            </div>
            <button>
              <FaRegArrowAltCircleRight size={25} />{" "}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CommentList;
