import React, { useState, useEffect } from 'react';
import style from '../styles/message.module.scss';

const Message = ({
  message,
  duration,
  status,
}: {
  message: string;
  duration: number;
  status: string;
}) => {
  const [remainingDuration, setRemainingDuration] = useState(duration);
  const statusStyles = {
    backgroundColor: status === 'success' ? '#4CAF50' : '#f44336',
    color: status === 'success' ? '#fff' : '#fff',
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (remainingDuration > 0) {
      timer = setInterval(() => {
        setRemainingDuration((prevDuration) => prevDuration - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [remainingDuration]);

  useEffect(() => {
    if (remainingDuration === 0) {
      const messageContainer = document.querySelector('#messageContainer');
      if (messageContainer) {
        messageContainer.remove();
      }
    }
  }, [remainingDuration]);

  if (remainingDuration === 0) return null;

  return (
    <div
      className={style.messageContainer + ' ' + style.show}
      style={{ ...statusStyles }}
    >
      {message}
    </div>
  );
};

export default Message;
