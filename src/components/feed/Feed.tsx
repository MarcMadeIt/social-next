import React from "react";
import Post from "./Post";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = await auth(); // Fetch userId only if needed

  let posts: any[] = [];

  // Fetch posts based on the username or fetch posts for the logged-in user and their following
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (userId) {
    // Fetch posts for the logged-in user and their following
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((f) => f.followingId);
    const ids = [userId, ...followingIds];

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: ids,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
  
    posts = await prisma.post.findMany({
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <div className="flex flex-col gap-5 mb-24">
      {posts.length
        ? posts.map((post) => (
            <Post key={post.id} post={post} userId={userId || ""} />
          ))
        : "No Post Found"}
    </div>
  );
};

export default Feed;
