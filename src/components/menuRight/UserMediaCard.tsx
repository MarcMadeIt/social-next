import prisma from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { User, Post } from "../../../prisma/generated/client"; // import Post, hvis den er genereret

const UserMediaCard = async ({ user }: { user: User }) => {
  const postsWithMedia: Post[] = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-3 flex flex-col gap-5 bg-foreground rounded-xl shadow-xl text12">
      {/* Header */}
      <div className="flex justify-between text-primary">
        <span className="text-secondary text-sm">Media</span>
        <Link href="/">
          {" "}
          <span className="font-medium text-secondary">See all</span>
        </Link>
      </div>
      {/* Content */}
      <div className="flex flex-wrap justify-center gap-5">
        {postsWithMedia.length
          ? postsWithMedia.map((post: Post) => (
              <div className="w-20 h-20 md:w-50 md:h-50 relative" key={post.id}>
                <Image
                  src={post.img!}
                  alt=""
                  className="object-cover rounded-md"
                  fill
                />
              </div>
            ))
          : "No media Found"}
      </div>
    </div>
  );
};

export default UserMediaCard;
