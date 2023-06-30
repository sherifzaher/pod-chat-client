import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { ConversationChannelPageStyle } from '@/utils/styles';
import { getConversationMessages } from "@/utils/api";
import MessagePanel from "@/components/messages/message-panel";

function ConversationChannelPage() {
  const { id } = useParams<{ id: string }>();
  const [messages,setMessages] = useState<Message[]>([]);

  useEffect(()=>{
    if (!id) return;

    getConversationMessages(Number(id))
      .then(({ data } ) => setMessages(data))
      .catch((err) => console.log(err));

  },[id])
  return (
    <ConversationChannelPageStyle>
      <MessagePanel messages={messages} />
    </ConversationChannelPageStyle>
  );
}

export default ConversationChannelPage;
