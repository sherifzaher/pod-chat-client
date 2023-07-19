import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AppDispatch } from '../../store';
import { fetchGroupMessagesThunk } from '../../store/slices/group-message-slice';

import MessagePanel from '../../components/messages/message-panel';

import { ConversationChannelPageStyle } from '../../utils/styles';
import { useSocketContext } from '../../context/socket-context';

function GroupChannelPage() {
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchGroupMessagesThunk(Number(id)));
  }, [id, dispatch]);

  useEffect(() => {
    if (!id) return;
    socket.emit('onGroupJoin', { groupId: id });
    return () => {
      socket.emit('onGroupLeave', { groupId: id });
    };
  }, []);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel isRecipientTyping={isRecipientTyping} />
    </ConversationChannelPageStyle>
  );
}

export default GroupChannelPage;
