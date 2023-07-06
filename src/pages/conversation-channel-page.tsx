import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchMessagesThunk } from '../store/slices/messages-slice';
import { AppDispatch } from '../store';

import MessagePanel from '../components/messages/message-panel';

import { ConversationChannelPageStyle } from '../utils/styles';

function ConversationChannelPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessagesThunk(Number(id)));
  }, [id]);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel />
    </ConversationChannelPageStyle>
  );
}

export default ConversationChannelPage;
