import Feed from '@/components/feed/Feed'
import FollowButton from '@/components/FollowButton'
import MenuLeft from '@/components/menuLeft/MenuLeft'
import MenuRight from '@/components/menuRight/MenuRight'
import UserInfoCard from '@/components/menuRight/UserInfoCard'
import UserMediaCard from '@/components/menuRight/UserMediaCard'

import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

// Type for the props passed to the page component


const ProfilePage = async ({ params }: { params: { username: string }}) => {
  const { username } = params;

  // Fetch the user from the database based on the username
  const user = await prisma.user.findFirst({
    where: { username },
    include: {
      _count: {
        select: {
          Followers: true
        }
      }
    },
  });

  if (!user) return notFound();

  // Get the current logged-in user info
  const authUser = auth();

  // Ensure the userId is extracted correctly
  const currentUserId = authUser?.userId;

  // Initialize block and follow state variables
  let isBlocked = false;
  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  // Check if the current user is blocked by the profile owner
  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    isBlocked = !!blockRes;
  }

  // If the user is blocked, show a not found page
  if (isBlocked) return notFound();

  // Check if the current user has blocked the profile owner and follow status
  if (currentUserId) {
    const userBlockedRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });

    isUserBlocked = !!userBlockedRes;

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    isFollowing = !!followRes;

    const followReqRes = await prisma.followerRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });

    isFollowingSent = !!followReqRes;
  }

  return (
    <div>
      <div className="flex gap-6 md:pt-6">
        <div className="hidden xl:block w-[20%]">
          <MenuLeft type="profile" />
        </div>
        <div className="w-full md:w-[70%] xl:w-[50%] h-80">
          <div className="flex flex-col gap-6">
            <div className="py-5 flex flex-col items-center gap-5 bg-foreground rounded-xl shadow-xl text13">
              <div className="relative w-full h-48 md:h-64 ">
                <Image src={user.cover || "/pawcover.png"} alt="" fill className="object-contain rounded-lg" sizes="100vw" />
                <div className='w-36 h-36 relative left-0 right-0 m-auto -bottom-28'>
                <Image
                  src={user.avatar || "/noavatar.png"}
                  alt=""
                  fill
                  className="object-cover rounded-[25%] ring-8 ring-foreground z-10"
                  />
                  </div>
              </div>
              <div className="flex flex-col justify-center items-center mt-10 gap-4 h-[40%]">
                <span className="flex flex-col justify-center items-center text-primary text-xl font-semibold">
                  {user.firstname}
                </span>
                <div className="cursor-pointer flex items-center">
                  <div className="flex items-center translate-x-4">
                    <Image
                      src="/cat.jpg"
                      alt=""
                      width={100}
                      height={100}
                      className="w-[26px] h-[26px] object-cover rounded-lg ring-2 ring-background"
                    />
                    <Image
                      src="/cat2.jpg"
                      alt=""
                      width={100}
                      height={100}
                      className="w-[26px] h-[26px] object-cover rounded-lg -translate-x-1 ring-2 ring-background"
                    />
                    <Image
                      src="/cat5.jpg"
                      alt=""
                      width={100}
                      height={100}
                      className="w-[26px] h-[26px] object-cover rounded-lg -translate-x-2 ring-2 ring-background"
                    />
                    <span className="text-md bg-foreground flex justify-center items-center -translate-x-3 text-primary w-[26px] h-[26px] rounded-lg">
                      +
                    </span>
                  </div>
                  <span className="text-extra font-medium z-10">{user._count.Followers} Amigos</span>
                </div>
              </div>
              {currentUserId !== user.id && (
                <FollowButton
                  userId={user.id}
                  isUserBlocked={isUserBlocked}
                  isFollowing={isFollowing}
                  isFollowingSent={isFollowingSent}
                />
              )}
            </div>
            <div className="flex flex-col md:hidden gap-6">
              <UserInfoCard user={user} />
              <UserMediaCard user={user} />
            </div>
            <Feed />
          </div>
        </div>
        <div className="hidden md:block w-[30%]">
          <MenuRight user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
