import { ConversationChannelPageStyle } from '@/utils/styles';
import { useAuthContext } from '@/context/auth-context';

function ConversationPanel() {
  const { user } = useAuthContext();
  return (
    <ConversationChannelPageStyle>
      ConversationPanel
      {user?.email}
    </ConversationChannelPageStyle>
  );
}

export default ConversationPanel;
