import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useSocketContext } from '../context/socket-context';
import {addMessage, fetchMessagesThunk} from '../store/slices/messages-slice';
import { AppDispatch } from '../store';

import MessagePanel from '../components/messages/message-panel';

import { ConversationChannelPageStyle } from '../utils/styles';
import {updateConversation} from "../store/slices/conversation-slice";

function ConversationChannelPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessagesThunk(Number(id)));
  }, [id]);

  useEffect(() => {
    socket.on('connected', () => console.log('connected'));
    socket.on('onMessage', (payload: MessageEventPayload) => {
      const { conversation } = payload;
      dispatch(addMessage(payload));
      dispatch(updateConversation(conversation));
    });

    return () => {
      socket.off('connected');
      socket.off('onMessage');
    };
  }, [socket, dispatch, id]);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel />
    </ConversationChannelPageStyle>
  );
}

export default ConversationChannelPage;
