import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';

import {useSocketContext} from "../context/socket-context";
import {fetchMessagesThunk} from "../store/slices/conversation-slice";
import {AppDispatch, RootState} from "../store";

import MessagePanel from "../components/messages/message-panel";

import {ConversationChannelPageStyle} from "../utils/styles";

function ConversationChannelPage() {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  // const messages = useSelector((state:RootState) => state.conversations.messages)
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();

  useEffect(() => {
    if(!id) return;
    dispatch(fetchMessagesThunk(Number(id)));
  },[id])

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
