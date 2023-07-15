import {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {useSocketContext} from "../../context/socket-context";
import {fetchMessagesThunk} from '../../store/slices/messages-slice';
import { AppDispatch } from '../../store';

import MessagePanel from '../../components/messages/message-panel';

import { ConversationChannelPageStyle } from '../../utils/styles';

function GroupChannelPage() {
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const socket = useSocketContext();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchMessagesThunk(Number(id)));
  }, [id]);

  useEffect(() => {
    const conversationId = id!;
  },[id,socket]);

  return (
    <ConversationChannelPageStyle>
      <MessagePanel isRecipientTyping={isRecipientTyping} />
    </ConversationChannelPageStyle>
  );
}

export default GroupChannelPage;
