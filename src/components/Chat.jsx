import React, { useState } from "react";
import sendIcon from "../assets/send-mes-img.png";
import clearButton from "../assets/clear.png";
import deleteMessage from "../assets/clear-message.png";
import dayjs from "dayjs";
import classNames from "classnames";

const Chat = ({
                imageSrc,
                playerName,
                messages,
                onSendMessage,
                onClearChat,
                onDeleteMessage,
              }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (input.trim()) {
      const sendTime = dayjs().format("HH:mm");
      onSendMessage({ text: input, playerName, sendTime });
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
      <div className="chat-container">
        <div className="chat-field-header">
          <div className="player-logo-part">
            <img src={imageSrc} alt={playerName} />
            <p>{playerName}</p>
          </div>
          <button onClick={onClearChat}>
            <img src={clearButton} alt="Clear" className="clear-chat-button" />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
              <div
                  key={index}
                  className={classNames("chat-message", {
                    "own-message": message.playerName === playerName,
                    "opponent-message": message.playerName !== playerName,
                  })}
              >
                {message.playerName === playerName && (
                    <button
                        onClick={() => onDeleteMessage(index)}
                        className="delete-message-btn"
                    >
                      <img src={deleteMessage} alt="Delete" />
                    </button>
                )}
                <div className="message-field">
                  <span>{message.text} </span>
                  <span className="message-timesend">{message.sendTime}</span>
                </div>
              </div>
          ))}
        </div>
        <div className="chat-input">
          <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Message"
          />
          <button onClick={handleSendMessage}>
            <img src={sendIcon} alt="Send" className="send-icon" />
          </button>
        </div>
      </div>
  );
};

export default Chat;
