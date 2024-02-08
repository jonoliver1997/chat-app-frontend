import React, { useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [displayName, setDisplayName] = useState("Mario Mario");
  const [pronouns, setPronouns] = useState("he/him");
  const [aboutMe, setAboutMe] = useState(
    "Saving princesses, and fighting Koopas, because why not? I never chose this life."
  );
  const [primaryColor, setPrimaryColor] = useState("black");
  const [accentColor, setAccentColor] = useState("red");
  const [isChanged, setIsChanged] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const [loading, setLoading] = useState(false);

  const postDetails = async (pic) => {
    setLoading(true);

    if (!pic || (pic.type !== "image/jpeg" && pic.type !== "image/png")) {
      alert("Error with the profile photo");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dddnteeyw");

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dddnteeyw/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();

      setProfilePhoto(cloudinaryData.url.toString());
      console.log(
        "Cloudinary upload successful:",
        cloudinaryData.url.toString()
      );

      setLoading(false);
      setIsChanged(true);
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setIsChanged(false);
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("token"); // Replace with your actual token retrieval logic

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      // Send the updated profile photo URL to your server
      const { data } = await axios.put(
        `http://localhost:3500/api/users/${userId}/update-profile-picture`,
        { profilePhoto },
        config
      );

      console.log("Profile photo updated successfully:", data);
    } catch (error) {
      console.error("Error updating profile photo:", error);
    }
  };

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
    setIsChanged(true);
  };

  const handlePronounsChange = (event) => {
    setPronouns(event.target.value);
    setIsChanged(true);
  };

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
    setIsChanged(true);
  };

  const handlePrimaryColorChange = (event) => {
    setPrimaryColor(event.target.value);
    setIsChanged(true);
  };

  const handleAccentColorChange = (event) => {
    setAccentColor(event.target.value);
    setIsChanged(true);
  };

  return (
    <div className="bg-zinc-700	p-4 flex text-white justify-center items-start">
      <div>
        <div className="flex flex-col">
          <label className="text-gray-200">Display Name</label>
          <input
            className="mt-1 p-3 bg-zinc-900 rounded-md"
            type="text"
            placeholder="Enter username"
            value={displayName}
            onChange={handleDisplayNameChange}
          />
        </div>
        <hr className="my-6" />
        <div className="flex flex-col">
          <label className="text-gray-200">Pronouns</label>
          <input
            className="mt-1 p-3 bg-zinc-900 rounded-md"
            type="text"
            placeholder="he/him"
            value={pronouns}
            onChange={handlePronounsChange}
          />
        </div>
        <hr className="my-6" />
        <div className="flex flex-col items-start">
          <p>Profile Photo</p>
          <div className="mt-2">
            <label
              htmlFor="profile-avatar"
              className="rounded-md text-gray-200 bg-blue-600 px-4 py-2 hover:cursor-pointer hover:bg-blue-700"
            >
              Change Profile Photo
            </label>
            <input
              id="profile-avatar"
              className="hidden"
              type="file"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex flex-col items-start">
          <p>Profile Banner</p>
          <label
            htmlFor="profile-banner"
            className="rounded-md text-gray-200 bg-blue-600 px-4 py-2 mt-2 hover:cursor-pointer hover:bg-blue-700"
          >
            Change Banner
          </label>
          <input id="profile-banner" className="hidden" type="file" />
        </div>
        <hr className="my-6" />
        <div>
          <label className="text-gray-200">Profile Theme</label>
          <div className="flex mt-2">
            <div className="flex flex-col items-center">
              <label
                style={{ backgroundColor: primaryColor }}
                className="rounded-md h-16 w-20 hover:cursor-pointer"
                htmlFor="profile-primary"
              ></label>
              <input
                id="profile-primary"
                className="hidden"
                type="color"
                value={primaryColor}
                onChange={handlePrimaryColorChange}
              />
              <p>Primary</p>
            </div>
            <div className="flex flex-col items-center ml-6">
              <label
                style={{ backgroundColor: accentColor }}
                className="rounded-md h-16 w-20 hover:cursor-pointer"
                htmlFor="profile-accent"
              ></label>
              <input
                id="profile-accent"
                className="hidden"
                type="color"
                value={accentColor}
                onChange={handleAccentColorChange}
              />
              <p>Accent</p>
            </div>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex flex-col">
          <label className="text-gray-200">About Me</label>
          <textarea
            className="rounded-md mt-2 p-4 bg-zinc-900"
            name=""
            id=""
            cols="40"
            rows="8"
            value={aboutMe}
            onChange={handleAboutMeChange}
          ></textarea>
        </div>
      </div>
      <div className="ml-8">
        <p>Preview</p>
        <div
          className="rounded-md border-2 border-white mt-1 max-w-sm"
          style={{ backgroundColor: primaryColor, minWidth: "24rem" }}
        >
          <div
            className="rounded-t-sm h-32 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1613278137247-0bf3fff95fe2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            }}
          ></div>
          <div className="rounded-md bg-white p-4 m-4 text-black flex flex-col">
            <img
              className="rounded-md w-20 border border-black"
              src="https://cdn.vox-cdn.com/thumbor/qTxuxzcM3KZpe6G3HUztP9jFpVo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/12095359/nintendo_direct_mario.0.0.0.jpg"
              alt=""
            />
            <p className="font-bold mt-2">{displayName}</p>
            <p>mario_mario83</p>
            <p>{pronouns}</p>
            <hr className="my-2" />
            <p className="font-bold">About Me</p>
            <p>{aboutMe}</p>
            <button
              style={{ backgroundColor: accentColor }}
              className="rounded-md py-2 mt-4 font-medium"
            >
              Example Button
            </button>
          </div>
        </div>
        {isChanged && (
          <button
            className="rounded-md bg-green-600 p-4 mt-4"
            onClick={handleSave}
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
