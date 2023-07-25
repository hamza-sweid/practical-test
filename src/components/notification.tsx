import React from 'react';

interface Message {
  type: string;
  content: string;
}

interface Props {
  message: Message;
}

const Notification: React.FC<Props> = ({ message }) => {
  return (
    <div className={`notif ${message.content ? 'show' : ''}`}>
      {message.type && message.content && (
        <div className={`notification ${message.type}`}>{message.content}</div>
      )}
    </div>
  );
};

export default Notification;
