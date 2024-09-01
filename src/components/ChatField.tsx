import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import playerX from "../assets/x-player.png";
import playerO from "../assets/o-player.png";

interface ChatFieldProps {
  resetFlag: boolean;
}
interface Message {
  text: string;
  playerName: string;
  sendTime: string;
}

const ChatField: React.FC<ChatFieldProps> = ({ resetFlag }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (message:Message) => {
    setMessages((prevState) => [...prevState, message]);
  };

  const handleDeleteMessage = (index:number) => {
    setMessages((prevState) => prevState.filter((_, i) => i !== index));
  };
  const handleClearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    if(resetFlag) {
        setMessages([]);
    }
  }, [resetFlag]);

  return (
    <div className="chat-field">
      <Chat
        imageSrc={playerX}
        playerName="Player 1"
        messages={messages}
        onSendMessage={handleSendMessage}
        onClearChat={handleClearChat}
        onDeleteMessage={handleDeleteMessage}
      />
      <div className="vertical-divider" /> 
      <Chat
        imageSrc={playerO}
        playerName="Player 2"
        messages={messages}
        onSendMessage={handleSendMessage}
        onClearChat={handleClearChat}
        onDeleteMessage={handleDeleteMessage}
      />
    </div>
  );
}

export default ChatField;