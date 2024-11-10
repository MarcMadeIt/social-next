import React, { Suspense } from "react";
import PawPelsRequest from "./PawPalsRequest";
import Birthdays from "./Birthdays";
import Ads from "./Ads";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { User } from "../../../prisma/generated/client";

const MenuRight = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-5">
      {user ? (
        <>
          <Suspense fallback="Loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="Loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <PawPelsRequest />
      <Birthdays />
      <Ads size="md" />
    </div>
  );
};

export default MenuRight;
