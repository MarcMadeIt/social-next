"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { useUser } from "@clerk/clerk-react"; // Import the useUser hook from Clerk

const AddPostButton = () => {
  const { pending } = useFormStatus();
  const { isSignedIn } = useUser(); // Check if the user is signed in

  // Disable the button if the user is not signed in or if the form is pending
  const isButtonDisabled = !isSignedIn || pending;

  return (
    <button
      className="btn disabled:border-placeholder disabled:text-placeholder disabled:cursor-not-allowed"
      disabled={isButtonDisabled}
    >
      {pending ? (
        <div
          className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-primary"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Sending
          </span>
        </div>
      ) : (
        "Send"
      )}
    </button>
  );
};

export default AddPostButton;
