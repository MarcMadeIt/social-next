"use client";

import { deletePost } from "@/lib/actions";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaEllipsisVertical, FaShieldHalved, FaTrash } from "react-icons/fa6";

const PostActions = ({
  postId,
  userId,
  postUserId,
}: {
  postId: number;
  userId: string;
  postUserId: string;
}) => {
  const [openActions, setOpenActions] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggleActions = () => {
    setOpenActions((prevOpen) => !prevOpen);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePost(postId.toString());
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-3 text13 cursor-pointer p-2"
        onClick={handleToggleActions}
      >
        <FaEllipsisVertical size={24} />
      </button>
      {openActions && (
        <div className="absolute z-10 bg-foreground ring-2 ring-background rounded-lg p-3 right-0 flex flex-col gap-2 text13 w-28">
          {userId !== postUserId && (
            <button className="flex items-center gap-2 p-1 hover:text-secondary transition-colors duration-300">
              <FaShieldHalved size={15} /> Report
            </button>
          )}

          {userId === postUserId && (
            <>
              <button className="flex items-center gap-2 p-1 hover:text-secondary transition-colors duration-300">
                <FaEdit size={15} /> Edit
              </button>
              <button
                className="flex items-center gap-2 p-1 hover:text-secondary transition-colors duration-300"
                onClick={handleDelete}
                disabled={loading}
              >
                <FaTrash size={15} /> {loading ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostActions;
