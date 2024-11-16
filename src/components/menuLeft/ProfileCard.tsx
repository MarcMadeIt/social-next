import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  return (
    <div className="p-5 bg-foreground flex flex-col justify-center items-start gap-2 rounded-xl shadow-xl text13 h-auto">
      <Link
        href={`/profile/${user.username}`}
        className="flex justify-center items-center gap-5"
      >
        <div className="relative h-12 w-12 text-center">
          <Image
            src={user.avatar || "/noavatar.png"}
            alt=""
            fill
            className="object-cover rounded-[25%] ring-8 ring-foreground z-10"
          />
        </div>
        <div className="flex justify-center gap-3 items-center">
          <div className="text12 text-extra py-1 px-2 bg-user rounded-md font-semibold">
            <span className="text-lg leading-3 cursor-pointer">@</span>
            {user.username}
          </div>
          <span className="text13 text-13">{user.firstname}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProfileCard;
