"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn" disabled={pending}>
      {pending ? "Updaing..." : "Update"}
    </button>
  );
};

export default UpdateButton;
