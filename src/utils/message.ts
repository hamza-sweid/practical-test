let message = { type: '', content: '' };

function setMessage(newMessage: {
  type: string;
  content: string;
  duration?: number;
}) {
  message = newMessage;
  const messageUpdatedEvent = new CustomEvent('messageUpdated');
  window.dispatchEvent(messageUpdatedEvent);

  setTimeout(() => {
    clearMessage();
  }, 3000);
}

function clearMessage() {
  message = { type: '', content: '' };
  const messageUpdatedEvent = new CustomEvent('messageUpdated');
  window.dispatchEvent(messageUpdatedEvent);
}

function getMessage() {
  return message;
}

export { setMessage, clearMessage, getMessage };
