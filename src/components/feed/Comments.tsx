import React from "react";
import CommentList from "./CommentList";
import prisma from "@/lib/client";

const Comments = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="flex flex-col gap-1">
      <CommentList comments={comments} postId={postId} />
    </div>
  );
};

export default Comments;
