import { TbEdit } from 'react-icons/tb';
import { ConversationSidebarStyle } from '@/utils/styles';

function ConversationSidebar() {
  return (
    <ConversationSidebarStyle>
      <header>
        <h1>Conversations</h1>
        <TbEdit size="30" />
      </header>
    </ConversationSidebarStyle>
  );
}

export default ConversationSidebar;
