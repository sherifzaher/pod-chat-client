import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Page } from '../../utils/styles';
import ConversationPanel from '../../components/conversations/conversation-panel';

import { AppDispatch } from '../../store';
import { fetchGroupThunk } from '../../store/slices/group-slice';
import { updateType } from '../../store/slices/selected-slice';
import { addGroupMessage } from "../../store/slices/group-message-slice";

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
    socket.on('onGroupMessage', (payload: GroupMessageEventPayload) => {
      console.log('Group Message Received');
      const { group, message } = payload;
      console.log(group, message);
      dispatch(addGroupMessage(payload));
    });

    return () => {
      socket.off('onGroupMessage');
    };
  }, [dispatch, id, socket]);

  return (
    <Page>
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
}

export default GroupPage;
