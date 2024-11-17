"use client";

import React, { useState } from "react";
import { IoPaw, IoPawOutline } from "react-icons/io5";
import { FaRegCommentDots, FaShareFromSquare } from "react-icons/fa6";
import { switchLike } from "@/lib/actions"; // Import your switchLike backend function
import { useClerk } from "@clerk/nextjs";

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

  const { openSignIn } = useClerk(); // Access Clerk's openSignIn function

  const likeAction = async () => {
    if (!isAuthenticated) {
      openSignIn(); // Open Clerk's sign-in modal if not authenticated
      return;
    }

    try {
      const response = await switchLike(postId);

      // Check if the backend indicates the user is not authenticated
      if (
        !response.success &&
        response.message === "User is not authenticated"
      ) {
        openSignIn(); // Open sign-in modal if necessary
        return;
      }

      if (response.success) {
        setLikeState((prevState) => ({
          likeCount: prevState.isLiked
            ? prevState.likeCount - 1
            : prevState.likeCount + 1,
          isLiked: !prevState.isLiked,
        }));
      } else {
        console.error("Error updating like:", response.message);
      }
    } catch (err) {
      console.error("Error updating like:", err);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex text14 gap-6 text-primary">
        {/* Like Button */}
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

        {/* Comment Section */}
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="font-medium w-3">{commentNumber}</span>
          <hr className="h-4 w-0 border-[1px] border-solid border-placeholder rounded-md" />
          <FaRegCommentDots />
          <span>Comment</span>
        </div>

        {/* Share Button */}
        <div className="flex items-center gap-1 cursor-pointer">
          <FaShareFromSquare />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
