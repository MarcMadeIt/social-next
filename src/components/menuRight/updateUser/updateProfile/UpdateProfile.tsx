import React, { useActionState } from "react";
import { User } from "../../../../../prisma/generated/client";
import { updateProfile } from "@/lib/actions";
import { Span } from "next/dist/trace";

const UpdateProfile = ({ user }: { user: User }) => {
  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  return (
    <form
      className="flex flex-col gap-4"
      action={(formData) => formAction({ formData })}
    >
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <label className="block text12 font-medium text-text">Pet name</label>
          <input
            type="text"
            className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
            placeholder={user.firstname || ""}
            name="firstname"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text12 font-medium text-text">
            Owner name
          </label>
          <input
            type="text"
            className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
            placeholder={user.owner || ""}
            name="owner"
          />
        </div>
      </div>

      {/* By og Land */}
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <label className="block text12 font-medium text-text">City</label>
          <input
            type="text"
            className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
            placeholder={user.city || ""}
            name="city"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text12 font-medium text-text">Country</label>
          <input
            type="text"
            className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
            placeholder={user.country || ""}
            name="country"
          />
        </div>
      </div>

      {/* Race og Farve */}
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <label className="block text12 font-medium text-text">Race</label>
          <input
            type="text"
            className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
            placeholder={user.race || "fx. Persian"}
            name="race"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text12 font-medium text-text">Color</label>
          <input
            type="text"
            className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
            placeholder={user.color || "fx. White"}
            name="color"
          />
        </div>
      </div>

      {/* Beskrivelse */}
      <div className="flex flex-col gap-2">
        <label className="block text12 font-medium text-text">
          Description
        </label>
        <textarea
          className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md resize-none w-full h-24"
          placeholder={user.desc || "Tell about yourself..."}
          name="desc"
        />
      </div>

      {/* Sociale medier */}
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <label className="block text12 font-medium text-text">
            Instagram
          </label>
          <input
            type="text"
            className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
            placeholder={user.instagram || "Instagram username"}
            name="instagram"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block text12 font-medium text-text">Facebook</label>
          <input
            type="text"
            className="p-2 border-2 border-shadow outline-none bg-foreground rounded-md"
            placeholder={user.facebook || "Facebook username"}
            name="facebook"
          />
        </div>
      </div>

      {/* Submit-knap */}
      <div className="flex gap-2 items-center">
        <button className="btn cursor-pointer w-20" type="submit">
          Update
        </button>
        {state.success && (
          <span className="text-primary">Profile has been updated!</span>
        )}
        {state.error && (
          <span className="text-red-700">Something went wrong!</span>
        )}
      </div>
    </form>
  );
};

export default UpdateProfile;
