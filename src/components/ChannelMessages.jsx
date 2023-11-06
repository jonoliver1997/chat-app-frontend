import React, { useState, useEffect } from "react";
import Message from "./Message";
import RestructuredData from "../Data/RestructuredData.json";

const ChannelMessages = () => {
  
  const channelId = 1;
  const messages = RestructuredData.channels[channelId].messages;
  const users = RestructuredData.users

  return (
    <div className="bg-gray-400 flex flex-col h-full p-4">
      <div className="text-5xl border-b border-gray-700 pb-4 flex items-centerjustify-center">
        <div>#</div>
        <div>{RestructuredData.channels[channelId].name}</div>
      </div>

      <br />

      {/* Scrollable container for messages */}
      <div className="flex-grow overflow-y-auto">
        {/* Map through messages and render each message */}
        {messages.map((messageData) => (
          <Message
            key={messageData.id}
            profilePic={users[messageData.sender].profile_pic}
            name={users[messageData.sender].first_name}
            lastName={users[messageData.sender].last_name}
            message={messageData.content}
            timestamp={messageData.timestamp}
          />
        ))}
      </div>

      

      {/* Text Box*/}
      <div className="flex items-center p-2 bg-gray-300 rounded mt-auto mb-2">
        <input
          className="w-full text-black bg-transparent outline-none"
          placeholder="Send a message..."
        />
        <button className="ml-2 bg-green-500 text-white rounded p-2">
          send
        </button>
      </div>
    </div>
  );
};

export default ChannelMessages;
