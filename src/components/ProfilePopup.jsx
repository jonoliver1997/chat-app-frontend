// ProfilePopup.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePopup = ({ userId, onClose }) => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, token]);

  if (!userData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-gray-300 p-8 rounded max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose} // Trigger the onClose function when clicked
        >
          {/* Close button (X) */}
          &times;
        </button>
        <div className="flex justify-center items-center">
          <img
            src={userData.profilePhoto || "default-profile-image.jpg"}
            alt=""
            className="w-24 h-24 bg-black rounded-full object-cover"
          />
        </div>
        <div className="bg-gray-400 rounded-md p-8 mt-6">
          <p className="font-bold">
            {userData.firstName} {userData.lastName}
          </p>
          <hr className="mt-2" />
          <p className="mt-2 font-bold">About Me</p>
          <p
            style={{
              maxHeight: "10rem",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#4a5568 #cbd5e0",
              borderRadius: "4px",
            }}
          >
            {userData.aboutMe || "No information available"}
          </p>
          <hr className="mt-2" />
          <p className="mt-2 font-bold">Member since</p>
          <p>
            {new Date(userData.createdAt).toLocaleDateString() || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;

/*      <div className="flex justify-center items-center">
        <img
          src={userData.profilePhoto || "default-profile-image.jpg"}
          alt=""
          className="w-24 h-24 bg-black rounded-full object-cover"
        />
      </div>
      <div className="bg-zinc-900 rounded-md p-4 mt-6">
        <p className="font-bold">
          {userData.firstName} {userData.lastName}
        </p>
        <hr className="mt-2" />
        <p className="mt-2 font-medium">About Me</p>
        <p>{userData.aboutMe || "No information available"}</p>
        <hr className="mt-2" />
        <p className="mt-2">Member since</p>
        <p>{new Date(userData.createdAt).toLocaleDateString() || "Unknown"}</p>
      </div>
      */
