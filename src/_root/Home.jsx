import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { databaseService } from "../../appwrite/DatabaseService/DatabaseService";
import { authService } from "../../appwrite/AuthService/AuthService";
import { Client } from "appwrite";
import { feedMessages, updateMessages } from "../../features/messagesSlice";
import MessageCard from "./components/MessageCard";
import { conf } from "../conf/conf";
import { logout } from "../../features/authSlice";

function Home() {
  const [message, setMessage] = useState("");
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state.authSlice.userData;
  });
  const messagesFromStore = useSelector((state) => {
    return state.messagesSlice.messages;
  });

  const getAllMessages = async () => {
    try {
      const allMessagesResponse = await databaseService.getAllMessages();
      dispatch(feedMessages(allMessagesResponse));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsMessagesLoading(false);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  // subscribing to the messages collection
  useEffect(() => {
    const client = new Client();
    client.setEndpoint(conf.appwriteUrl);
    client.setProject(conf.appwriteProjectId);
    const unsubscribe = client.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteCollectionId}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          dispatch(updateMessages(response.payload));
          setTimeout(() => {
            let scrollDiv = document.getElementById("scrollableDiv");
            scrollDiv.lastElementChild.scrollIntoView();
          }, 100);
        }
      }
    );

    //cleanup
    return () => {
      unsubscribe();
    };
  }, []);

  const handleMessageSubmit = async (newMessage) => {
    const name = userData.name;
    const timestamp = new Date();
    const userId = userData.$id;
    const message = newMessage;

    try {
      await databaseService.addMessage({ message, name, timestamp, userId });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-ClightGray flex justify-center items-center">
      <div className="w-[800px] h-full bg-CChat flex flex-col overflow-y-scroll">
        <div className="h-[80px] bg-gray-900 flex justify-between items-center px-10">
          <div className="flex gap-5 justify-center items-center ">
            <div className=" flex justify-center items-center h-[50px] w-[50px] bg-white rounded-[100px]">
              {String(userData.name).charAt(0)}
            </div>
            <div>
              <p className="text-white text-md">
                {userData.name || "User"} (You)
              </p>
              <p className="text-green-400 text-sm">Online</p>
            </div>
          </div>
          <div>
            <img
              className="cursor-pointer"
              onClick={async (e) => {
                e.preventDefault();
                authService.logout();
                dispatch(logout());
              }}
              src="/logout.svg"
              alt="logout"
            />
          </div>
        </div>
        {/* display message */}
        <div
          id="scrollableDiv"
          className="h-full w-full overflow-y-scroll flex  gap-10 flex-col p-10"
        >
          {isError ? (
            <div className="text-white w-full h-full flex justify-center items-center">
              Something Went Wrong
            </div>
          ) : isMessagesLoading ? (
            <div className="text-white w-full h-full flex justify-center items-center">
              Messages Loading...
            </div>
          ) : (
            messagesFromStore.map((message) => {
              return (
                <MessageCard
                  key={message.$id}
                  messageTime={message.timestamp}
                  messageUserName={message.name}
                  messageText={message.message}
                  currentUserId={userData.$id}
                  messageUserId={message.userId}
                />
              );
            })
          )}
        </div>
        {/* display message */}

        {/* input */}
        <div className="h-[80px] w-full bg-gray-800 px-10 flex  gap-2 items-center">
          <input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            style={{
              border: "none",
              borderRadius: "100px",
              color: "white",
              padding: "20px",
            }}
            placeholder="Type something..."
            className="w-full h-[40px] bg-black "
            type="text "
          />

          <button
            type="submit"
            disabled={message.length === 0}
            onClick={(e) => {
              e.preventDefault();
              handleMessageSubmit(message);
            }}
            className="cursor-pointer bg-Cpurple p-2 h-[40px] w-[40px] flex justify-center items-center rounded-4xl"
          >
            <img className="w-[15px] h-[15px]" src="/send.svg" alt="send" />
          </button>
        </div>
        {/* input */}
      </div>
    </div>
  );
}

export default Home;
