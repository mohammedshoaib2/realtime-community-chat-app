import React from "react";

function MessageCard({
  messageTime,
  messageText,
  messageUserId,
  currentUserId,
  messageUserName,
}) {
  const time = new Date(messageTime).toLocaleTimeString();
  const date = new Date(messageTime).toDateString();
  return (
    <div
      className={`w-full flex ${
        messageUserId == currentUserId ? "justify-end" : "justify-start"
      } `}
    >
      <div
        style={{
          maxWidth: "80%",
          height: "fit-content",
        }}
        className={`bg-white p-5 rounded-3xl ${
          messageUserId == currentUserId ? "rounded-tr-[0]" : " rounded-tl-[0]"
        } `}
      >
        <div className="">
          <p className="text-Cpurple text-sm">{messageUserName || "User"}</p>

          <p className="text-xl"> {messageText}</p>
          <p className="text-gray-400 text-sm mt-2">{time}</p>
          <p className="text-gray-400 text-sm ">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
