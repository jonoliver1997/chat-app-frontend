import React from "react";
import { Link } from "react-router-dom";

export function Popup({ onClose }) {
  return (
    <div className="w-11/12 m-2 bg-white flex flex-col justify-center">
      <Link
        className="p-2 flex flex-row justify-start hover:bg-gray-400 w-full cursor-pointer"
        to="/profile"
      >
        Profile
      </Link>
      <div
        className="p-2 flex flex-row justify-start hover:bg-gray-400 w-full cursor-pointer"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
        <h5 className="ml-2 ">Logout</h5>
      </div>
    </div>
  );
}
