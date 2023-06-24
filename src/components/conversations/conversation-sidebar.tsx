import { useNavigate } from 'react-router-dom';
import { TbEdit } from 'react-icons/tb';
import {
  ConversationSidebarContainer,
  ConversationSidebarHeader,
  ConversationSidebarItem,
  ConversationSidebarStyle
} from '@/utils/styles';
import styles from './index.module.scss';

type Props = {
  conversations: Conversation[];
};

function ConversationSidebar({ conversations }: Props) {
  const navigate = useNavigate();

  return (
    <ConversationSidebarStyle>
      <ConversationSidebarHeader>
        <h1>Conversations</h1>
        <TbEdit size="30" />
      </ConversationSidebarHeader>
      <ConversationSidebarContainer>
        {conversations.map((conversation) => (
          <ConversationSidebarItem onClick={() => navigate(`/conversations/${conversation.id}`)}>
            <div className={styles.conversationAvatar} />
            <div>
              <span className={styles.conversationName}>{conversation.name}</span>
              <span className={styles.conversationLastMessage}>{conversation.lastMessage}</span>
            </div>
          </ConversationSidebarItem>
        ))}
      </ConversationSidebarContainer>
    </ConversationSidebarStyle>
  );
}

export default ConversationSidebar;
