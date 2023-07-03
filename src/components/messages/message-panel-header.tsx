import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import { MessagePanelHeaderStyle } from '../../utils/styles';
import {useAuthContext} from "../../context/auth-context";
import {RootState} from "../../store";

export default function MessagePanelHeader() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const conversations = useSelector((state: RootState) => state.conversations.conversations);
  const [conversation, setConversation] = useState<Conversation>();

  useEffect(() => {
    if(!id) return;
    const conversationId = Number(id);
    const conv = conversations.find((innerConv) => innerConv.id === conversationId);
    setConversation(conv);
  }, [conversations,id]);
  
  const getDisplayName = useCallback(() => user?.id === conversation?.creator.id
      ? `${conversation?.recipient?.firstName} ${conversation?.recipient?.lastName}`
      : `${conversation?.creator?.firstName} ${conversation?.creator?.lastName}` ,[conversation]);


  return (
    <MessagePanelHeaderStyle>
      {getDisplayName()}
    </MessagePanelHeaderStyle>
  );
}
