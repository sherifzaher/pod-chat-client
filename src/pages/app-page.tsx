import { Outlet } from 'react-router-dom';
import ConversationSidebar from '../components/sidebars/conversation-sidebar';
import UserSidebar from '../components/sidebars/user-sidebar';
import { Page } from '../utils/styles';

export default function AppPage() {
  return (
    <Page>
      <UserSidebar />
      <ConversationSidebar />
      <Outlet />
    </Page>
  );
}
