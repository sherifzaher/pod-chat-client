import { Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getConversations } from '@/utils/api';
import { Page } from '@/utils/styles';

import ConversationSidebar from '@/components/conversations/conversation-sidebar';
import ConversationPanel from '@/components/conversations/conversation-panel';

function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getConversations().then(({ data }) => {
      console.log(data);
      setConversations(data);
    });
  }, []);
  return (
    <Page>
      <ConversationSidebar conversations={conversations} />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
}

export default ConversationsPage;
