import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { createMessage } from "../../services/apiChats";
import { formatMessageTime } from "../../utils/helper";

const ChatRoom = ({ chat }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const formRef = useRef(null);
  const chatContainerRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const socketRef = useRef(null);
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authedUser);
  const [fileName, setFileName] = useState("");

  const [message, setMessage] = useState({
    from_id: user?.id,
    chat_id: chat?.id,
    message: "",
    type: "",
  });

  const channel = chat?.id ? `chat_${chat?.id}` : null;

  // WebSocket initialization
  useEffect(() => {
    const initializeWebSocket = () => {
      if (socketRef.current) {
        socketRef.current.close();
      }

      socketRef.current = new WebSocket(
        "wss://api.abday.com.sa/app/nb9shwzjuyd3inhumkzz?protocol=7&client=js&version=8.4.0&flash=false"
      );

      socketRef.current.onopen = () => {
        console.log("WebSocket connection established");

        if (chat?.id) {
          socketRef.current.send(
            JSON.stringify({
              event: "pusher:subscribe",
              data: { channel: channel },
            })
          );
        }
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const messageData = JSON.parse(data.data);

        console.log("Received message:", messageData);

        if (messageData?.message?.chat_id) {
          setMessages((prevMessages) => [...prevMessages, messageData.message]);
        }
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket connection closed");
      };
    };

    initializeWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [channel, chat?.id]);

  useEffect(() => {
    if (chat) {
      setMessages(chat?.messages.slice() || []);
      console.log(chat?.messages);
    }
  }, [chat]);

  // Scroll to the bottom of the chat container when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Clear recording interval on component unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (message?.type === "") {
      return;
    }

    const newMessage = {
      ...message,
      message:
        message.type !== "text"
          ? URL.createObjectURL(message.message)
          : message.message,
    };

    formRef.current.reset();

    setMessage({
      from_id: user?.id,
      chat_id: chat?.id,
      message: "",
      type: "",
    });

    try {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(
          JSON.stringify({
            event: "pusher:subscribe",
            data: { channel: channel },
          })
        );
      } else {
        console.log("WebSocket is not open");
      }

      await createMessage(newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setRecordingTime(0);
      setLoading(false);
    }
  };

  // Start recording
  const startRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0);
    const audioChunks = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorderInstance = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderInstance.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorderInstance.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/m4a" });

        setMessage((prevMessage) => ({
          ...prevMessage,
          message: audioBlob,
          type: "audio",
        }));

        mediaRecorderInstance.stream.getTracks().forEach((track) => {
          track.stop();
        });

        setIsRecording(false);
        clearInterval(recordingIntervalRef.current);
      };

      mediaRecorderInstance.start();
      setMediaRecorder(mediaRecorderInstance);
      startRecordingTimer();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsRecording(false);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    clearInterval(recordingIntervalRef.current);
  };

  // Start recording timer
  const startRecordingTimer = () => {
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  // Format recording time
  const formatRecordingTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Extract file name from URL
  const extractTextAfterMessages = (url) => {
    const regex = /_messages\.(.*)/;
    const match = url.match(regex);
    return match ? match[1] : fileName;
  };

  return (
    <div className="chat-container">
      <div className="chat-head">
        <div className="user">
          <img
            src={
              chat?.apply
                ? user?.id === chat?.apply?.id
                  ? chat?.owner?.image
                  : chat?.apply?.image || "/images/avatar.jpg"
                : "/images/deleted-account.jpg"
            }
            alt="user"
          />
          <h6 className="name">
            {chat?.apply
              ? user?.id === chat?.apply?.id
                ? chat?.owner?.name
                : chat?.apply?.name
              : t("chat.deletedAccount")}
          </h6>
        </div>
      </div>

      {chat?.service && (
        <Link to={`/services/${chat?.service?.id}`} className="adItem">
          <img src={chat?.service?.image || "/images/bann.webp"} alt="" />
          <p>{chat?.service?.title}</p>
        </Link>
      )}

      {chat?.project && (
        <Link to={`/projects/${chat?.project?.id}`} className="adItem">
          <p>{chat?.project?.title}</p>
        </Link>
      )}

      <div className="inner-container" ref={chatContainerRef}>
        {messages.map((message) => (
          <div
            className={`message ${
              message?.from_id === user?.id
                ? "sent-message"
                : "received-message"
            }`}
            key={message?.id}
          >
            <div className="d-flex flex-column">
              <div className="message-content">
                {message?.type === "text" && <p>{message?.message}</p>}
                {message?.type === "audio" && (
                  <audio controls src={message?.message} />
                )}
                {message?.type === "image" && (
                  <img
                    style={{
                      aspectRatio: 1 / 1,
                      width: "300px",
                      objectFit: "contain",
                    }}
                    src={message?.message}
                    alt=""
                  />
                )}
                {message?.type === "file" && (
                  <Link to={message?.message} target="_blank">
                    <div className="doc_message">
                      <p>{extractTextAfterMessages(message?.message)}</p>
                      <div className="icon">
                        <i className="fa-regular fa-file"></i>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              <span
                dir="ltr"
                className={message?.from_id === user?.id ? "sen" : "rec"}
              >
                {formatMessageTime(message?.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-send">
        <form onSubmit={handleSendMessage} ref={formRef}>
          <div className="input-field">
            {message?.type === "text" || message?.type === "" ? (
              <input
                type="text"
                placeholder={t("chat.writeHere")}
                value={message?.type === "text" ? message?.message : ""}
                onChange={(e) =>
                  setMessage({
                    ...message,
                    message: e.target.value,
                    type: "text",
                  })
                }
              />
            ) : (
              <div className="file_place">
                <i
                  style={{ cursor: "pointer" }}
                  className="fa-solid fa-xmark"
                  onClick={() => {
                    setMessage({ ...message, message: "", type: "" });
                    setRecordingTime(0);
                  }}
                />
                {message.type === "audio" ? (
                  <audio controls src={URL.createObjectURL(message?.message)} />
                ) : (
                  <p className="m-0">
                    {message?.message?.name || message?.message}
                  </p>
                )}
              </div>
            )}

            <label className="files-input">
              <i className="fa-regular fa-paperclip"></i>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFileName(file.name);
                  setMessage({
                    ...message,
                    message: file,
                    type: file.type.startsWith("image/")
                      ? "image"
                      : file.type.startsWith("audio/")
                      ? "audio"
                      : "file",
                  });
                }}
                type="file"
                name="userImage"
                id="img-upload"
              />
            </label>
            {isRecording ? (
              <label className="files-input" onClick={stopRecording}>
                <i className="fa-solid fa-microphone-slash"></i>
                <input type="" />
              </label>
            ) : (
              <label className="files-input" onClick={startRecording}>
                <i className="fa-solid fa-microphone"></i>
                <input type="" />
              </label>
            )}
            {recordingTime > 0 && (
              <span>{formatRecordingTime(recordingTime)}</span>
            )}
          </div>

          <button type="submit" disabled={message.type === "" && loading}>
            <i className="fa-regular fa-paper-plane-top"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
