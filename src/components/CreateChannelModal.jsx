import React, { useState } from "react";
import Data from "../Data/Data.json";
import "../styles/CreateChannelModal.css";

function CreateChannelModal({ channelModalRef, closeChannelModal }) {
  return (
    <dialog ref={channelModalRef}>
      <div id="channel-modal">
        <label id="channel-modal-input-label" htmlFor="">
          Channel Name
        </label>
        <input
          id="channel-modal-input"
          type="text"
          placeholder="Enter channel name here"
        />
        <fieldset className="overflow-y-scroll h-40 text-white">
          <legend>Add users to channel</legend>
          {Data.users.map((user) => (
            <div key={user.id} className="flex">
              <input type="checkbox" />
              <label className="ml-2">{user.first_name}</label>
            </div>
          ))}
        </fieldset>
        <div id="channel-modal-buttons">
          <button id="channel-modal-cancel" onClick={() => closeChannelModal()}>
            Cancel
          </button>
          <button id="channel-modal-create">Create Channel</button>
        </div>
      </div>
    </dialog>
  );
}

export default CreateChannelModal;
