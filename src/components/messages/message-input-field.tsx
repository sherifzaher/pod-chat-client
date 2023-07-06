import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postNewMessage } from '../../utils/api';
import { MessageInput, MessageInputContainer } from '../../utils/styles';
import { useSocketContext } from '../../context/socket-context';
import { useAuthContext } from '../../context/auth-context';

type Props = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function MessageInputField() {
  const [content, setContent] = useState('');
  const socket = useSocketContext();
  const { user } = useAuthContext();
  const { id } = useParams();

  const handleSendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!id || !content) return;
      try {
        await postNewMessage(Number(id), { content });
        setContent('');
      } catch (err) {
        console.log(err);
      }
    },
    [id, content]
  );

  const handleSendTypingStatus = () => {
    socket.emit('onUserTyping', {
      conversationId: id,
      sender: user?.id
    });
  };
  return (
    <MessageInputContainer>
      <form onSubmit={handleSendMessage}>
        <MessageInput
          onKeyDown={handleSendTypingStatus}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </MessageInputContainer>
  );
}
