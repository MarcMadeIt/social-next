import { updateProfile } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useActionState, useState } from "react";
import { User } from "../../../../../prisma/generated/client";

const UpdateLayout = ({ user }: { user: User }) => {
  const [cover, setCover] = useState<any>();
  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  return (
    <form
      className="flex flex-col gap-2"
      action={() => formAction({ cover: cover?.secure_url || "" })}
    >
      <label className="block text12 font-medium text-text">
        Cover Picture
      </label>

      <CldUploadWidget
        uploadPreset="social-next"
        onSuccess={(result) => setCover(result.info)}
      >
        {({ open }) => (
          <div className="flex justify-between items-center relative">
            <div className="ring-foreground ring-2 rounded-md relative w-52 h-24">
              <Image
                src={cover?.secure_url || user.cover || "/pawcover2.png"}
                alt="Cover"
                objectFit="contain"
                fill
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  className="btn cursor-pointer"
                  onClick={() => open()}
                >
                  Change
                </button>
                <button type="submit" className="btn cursor-pointer">
                  Save
                </button>
              </div>
              {state.success && (
                <span className="text-primary absolute bottom-0 right-0">
                  Cover has been updated!
                </span>
              )}
              {state.error && (
                <span className="text-red-700">Something went wrong!</span>
              )}
            </div>
          </div>
        )}
      </CldUploadWidget>
    </form>
  );
};

export default UpdateLayout;
