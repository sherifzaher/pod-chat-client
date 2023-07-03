import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import {addConversation, fetchConversationsThunk, updateConversation} from '../store/slices/conversation-slice';
import { Page } from '../utils/styles';
import ConversationSidebar from '../components/conversations/conversation-sidebar';
import ConversationPanel from '../components/conversations/conversation-panel';
import {addMessage} from "../store/slices/messages-slice";
import {useSocketContext} from "../context/socket-context";

function ConversationsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchConversationsThunk());
  }, []);

  useEffect(() => {
    socket.on('connected', () => console.log('connected'));
    socket.on('onMessage', (payload: MessageEventPayload) => {
      const { conversation } = payload;
      dispatch(addMessage(payload));
      dispatch(updateConversation(conversation));
    });

    socket.on('onConversation', (payload: Conversation) => {
      dispatch(addConversation(payload));
    })

    return () => {
      socket.off('connected');
      socket.off('onMessage');
      socket.off('onConversation');
    };
  }, [socket, dispatch, id]);

  return (
    <Page>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
}

export default ConversationsPage;
