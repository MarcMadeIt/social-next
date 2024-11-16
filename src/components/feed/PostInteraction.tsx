"use client";

import React, { useState } from "react";
import { IoPaw, IoPawOutline } from "react-icons/io5";
import { FaRegCommentDots, FaShareFromSquare } from "react-icons/fa6";
import { switchLike } from "@/lib/actions"; // Import your switchLike backend function

interface Props {
  postId: number;
  likes: string[];
  commentNumber: number;
  isAuthenticated: boolean;
}

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
  isAuthenticated,
}: Props) => {
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: isAuthenticated && likes.includes(postId.toString()),
  });

  const likeAction = async () => {
    if (!isAuthenticated) return;

    setLikeState((prevState) => ({
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
      isLiked: !prevState.isLiked,
    }));

    try {
      await switchLike(postId);
    } catch (err) {
      console.error("Error updating like:", err);

      setLikeState((prevState) => ({
        likeCount: prevState.isLiked
          ? prevState.likeCount + 1
          : prevState.likeCount - 1,
        isLiked: prevState.isLiked,
      }));
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex text14 gap-6 text-primary">
        <button
          className="flex items-center gap-1 cursor-pointer"
          onClick={likeAction}
        >
          <span className="font-medium w-3">{likeState.likeCount}</span>
          <hr className="h-4 w-0 border-[1px] border-solid border-placeholder rounded-md" />
          {likeState.isLiked ? (
            <div className="flex gap-1 items-center text-primary">
              <IoPaw size={17} />
              <span>Paw</span>
            </div>
          ) : (
            <div className="flex gap-1 items-center text-extra">
              <IoPawOutline size={17} />
              <span>Paw</span>
            </div>
          )}
        </button>
        <div className="flex items-center gap-1 cursor-pointer ">
          <span className="font-medium w-3">{commentNumber}</span>
          <hr className="h-4 w-0 border-[1px] border-solid border-placeholder rounded-md" />
          <FaRegCommentDots />
          <span>Comment</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer ">
          <FaShareFromSquare />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
