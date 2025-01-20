import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ChatSideBar from "../ui/Chats/ChatsSideBar";
import ChatRoom from "../ui/Chats/ChatRoom";

const chats = [
  {
    id: 1,
    apply: { id: 2, name: "John Doe", image: "./images/avatar.jpg" },
    owner: {
      id: 1,
      name: "Alice Smith",
      image: "./images/avatar.jpg",
    },
    service: {
      id: 101,
      title: "Web Development Service",
      image: "https://via.placeholder.com/150",
    },
    project: null,
    messages: [
      {
        id: 101,
        from_id: 1,
        chat_id: 1,
        message: "Hello! How can I assist you?",
        type: "text",
        created_at: new Date().toISOString(),
      },
      {
        id: 102,
        from_id: 2,
        chat_id: 1,
        message: "I have a question about your services.",
        type: "text",
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 103,
        from_id: 1,
        chat_id: 1,
        message: "Sure, feel free to ask!",
        type: "text",
        created_at: new Date(Date.now() - 1800000).toISOString(),
      },
    ],
  },
  {
    id: 2,
    apply: {
      id: 3,
      name: "Mike Johnson",
      image: "./images/avatar.jpg",
    },
    owner: {
      id: 1,
      name: "Alice Smith",
      image: "./images/avatar.jpg",
    },
    service: null,
    project: {
      id: 202,
      title: "Mobile App Development Project",
    },
    messages: [
      {
        id: 201,
        from_id: 3,
        chat_id: 2,
        message: "Is this project still available?",
        type: "text",
        created_at: new Date().toISOString(),
      },
      {
        id: 202,
        from_id: 1,
        chat_id: 2,
        message: "Yes, it is. Are you interested?",
        type: "text",
        created_at: new Date(Date.now() - 7200000).toISOString(),
      },
    ],
  },
  {
    id: 3,
    apply: null,
    owner: null,
    service: null,
    project: null,
    messages: [
      {
        id: 301,
        from_id: 1,
        chat_id: 3,
        message: "This account has been deleted.",
        type: "text",
        created_at: new Date().toISOString(),
      },
    ],
  },
];
const chat = {
  id: 3,
  apply: null,
  owner: null,
  service: null,
  project: null,
  messages: [
    {
      id: 301,
      from_id: 1,
      chat_id: 3,
      message: "This account has been deleted.",
      type: "text",
      created_at: new Date().toISOString(),
    },
  ],
};

const Chats = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { t } = useTranslation();
  const [showChatsMenu, setShowChatsMenu] = useState(false);
  const [targetChat, setTargetChat] = useState(null);

  useEffect(() => {
    if (chat?.id) {
      setTargetChat(chat);
    } else {
      setTargetChat(null);
    }
    // eslint-disable-next-line
  }, [chat]);

  return (
    <section className="chat-section">
      <div className="container d-block">
        <button className="openTaps" onClick={() => setShowChatsMenu(true)}>
          <span> {t("chat.chats")} </span>
        </button>
        <div className="row">
          {chats?.length > 0 ? (
            <>
              <div className="col-lg-4 col-12 p-2">
                <ChatSideBar
                  chats={chats}
                  setTargetChat={setTargetChat}
                  targetChat={targetChat}
                  showChatsMenu={showChatsMenu}
                  setShowChatsMenu={setShowChatsMenu}
                />
              </div>
              <div className="col-lg-8 col-12 p-2">
                {targetChat ? (
                  <>
                    <ChatRoom chat={chat} />
                  </>
                ) : (
                  <div className="lottie_player_holder"></div>
                )}
              </div>
            </>
          ) : (
            <div className="lottie_player_holder"></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Chats;
