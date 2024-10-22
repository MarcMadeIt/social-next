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
    include: {
      _count: {
        select: {
          Followers: true,
        },
      },
    },
  });

  console.log(user);

  if (!user) return null;

  return (
    <div className="p-2 flex flex-col justify-center gap-5 bg-foreground rounded-xl shadow-xl text13 h-40">
      <div className="relative">
        <Image
          src={user.avatar || "/noavatar.png"}
          alt=""
          width={80}
          height={80}
          className="object-cover rounded-[25%] m-auto -bottom-10 ring-8 ring-foreground z-10"
        />
      </div>
      <div className="flex items-center justify-center">
        <Link href={`/profile/${user.username}`} className="btn-cta-light">
          My Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
