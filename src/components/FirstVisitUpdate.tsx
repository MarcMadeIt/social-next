import { useActionState, useEffect, useState } from "react";
import {
  checkUserProfile,
  firstVisitUpdate,
  updateProfile,
} from "@/lib/actions"; // Adjust the path as needed
import { FaXmark } from "react-icons/fa6";

interface FirstVisitProp {
  onClose: () => void;
  userId: string;
}

const FirstVisitUpdate = ({ userId, onClose }: FirstVisitProp) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("city", city);
    formData.append("country", country);

    // Pass userId and formData to firstVisitUpdate
    const result = await firstVisitUpdate(userId, { formData });

    if (result.success) {
      onClose(); // Close the modal if the update is successful
    } else {
      console.error("Profile update failed");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FirstVisitUpdate;
