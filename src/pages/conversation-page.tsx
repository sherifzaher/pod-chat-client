import { Outlet, useParams } from 'react-router-dom';
import { Page } from '@/utils/styles';
import ConversationSidebar from '@/components/conversations/conversation-sidebar';
import ConversationPanel from '@/components/conversations/conversation-panel';
import mockConversations from '@/__mocks__/conversations';

function ConversationsPage() {
  const { id } = useParams();
  // console.log(id);
  return (
    <Page>
      <ConversationSidebar conversations={mockConversations} />
      {!id && <ConversationPanel />}
      <Outlet />
    </Page>
  );
}

export default ConversationsPage;
