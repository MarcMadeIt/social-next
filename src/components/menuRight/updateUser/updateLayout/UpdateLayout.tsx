import { updateProfile } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useActionState, useState } from "react";
import { User } from "../../../../../prisma/generated/client";
import UpdateButton from "../../UpdateButton";

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
          <div className="flex flex-col gap-5 md:flex-row  md:justify-between md:items-center relative">
            <div className="ring-foreground ring-2 rounded-md relative w-52 h-24">
              <Image
                src={cover?.secure_url || user.cover || "/pawcover2.png"}
                alt="Cover"
                objectFit="contain"
                fill
              />
            </div>
            <div>
              <div className="flex flex-col gap-4 relative items-start ">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="btn-cta cursor-pointer"
                    onClick={() => open()}
                  >
                    Choose file
                  </button>
                  <UpdateButton />
                </div>

                <div className="mt-2 p-2 text11 rounded-md absolute -bottom-10">
                  {cover ? (
                    <span className=" text-secondary">
                      Selected file:{" "}
                      <strong className="text-extra">
                        {cover.original_filename}.{cover.format}
                      </strong>
                    </span>
                  ) : (
                    <span className="text-secondary">No file selected</span>
                  )}
                </div>
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
