import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ConversationChannelPageStyle } from '@/utils/styles';
import { getConversationMessages } from '@/utils/api';
import MessagePanel from '@/components/messages/message-panel';
import { useSocketContext } from '@/context/socket-context';

function ConversationChannelPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocketContext();

  useEffect(() => {
    if (!id) return;

    getConversationMessages(Number(id))
      .then(({ data }) => setMessages(data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    // console.log(socket);
    socket.on('connected', () => console.log('connected'));
    socket.on('onMessage', (payload: MessageEventPayload) => {
      const { conversation, ...message } = payload;
      setMessages((prev) => [message, ...prev]);
    });

    // console.log("Try to connect");
    return () => {
      socket.off('connected');
      socket.off('onMessage');
    };
  }, [socket]);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel messages={messages} />
    </ConversationChannelPageStyle>
  );
}

export default ConversationChannelPage;
