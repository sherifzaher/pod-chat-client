import { Outlet, useParams } from 'react-router-dom';
import { Page } from '@/utils/styles';
import ConversationSidebar from '@/components/conversations/conversation-sidebar';
import ConversationPanel from '@/components/conversations/conversation-panel';

function ConversationsPage() {
  const { id } = useParams();
  return (
    <Page>
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
}

export default ConversationsPage;
