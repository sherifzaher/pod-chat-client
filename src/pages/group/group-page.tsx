import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Page } from '../../utils/styles';
import ConversationSidebar from '../../components/conversations/conversation-sidebar';
import ConversationPanel from '../../components/conversations/conversation-panel';

import { AppDispatch } from '../../store';
import { fetchGroupThunk } from '../../store/slices/group-slice';
import { updateType } from '../../store/slices/selected-slice';
import { addMessage } from '../../store/slices/messages-slice';
import { updateConversation } from '../../store/slices/conversation-slice';

import { useSocketContext } from '../../context/socket-context';

function GroupPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();

  useEffect(() => {
    dispatch(updateType('group'));
    dispatch(fetchGroupThunk());
  }, [dispatch]);

  useEffect(() => {
    // socket.on('onMessage', (payload: MessageEventPayload) => {
    //   const { conversation } = payload;
    //   dispatch(addMessage(payload));
    //   dispatch(updateConversation(conversation));
    // });
  }, [id, socket]);

  return (
    <Page>
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
}

export default GroupPage;
