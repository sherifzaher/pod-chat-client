import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbEdit } from 'react-icons/tb';
import CreateConversationModal from '@/components/modals/create-conversation-modal';
import {
  ConversationSidebarContainer,
  ConversationSidebarHeader,
  ConversationSidebarItem,
  ConversationSidebarStyle
} from '@/utils/styles';
import { useAuthContext } from '@/context/auth-context';
import styles from './index.module.scss';

type Props = {
  conversations: Conversation[];
};

function ConversationSidebar({ conversations }: Props) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const getDisplayUser = useCallback(
    (conversation: Conversation) =>
      conversation.creator.id === user?.id ? conversation.recipient : conversation.creator,
    [conversations]
  );

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <ConversationSidebarStyle>
        <ConversationSidebarHeader>
          <h1>Conversations</h1>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div onClick={() => setShowModal((prev) => !prev)}>
            <TbEdit size="30" />
          </div>
        </ConversationSidebarHeader>
        <ConversationSidebarContainer>
          {conversations.map((conversation) => (
            <ConversationSidebarItem
              key={conversation.id}
              onClick={() => navigate(`/conversations/${conversation.id}`)}
            >
              <div className={styles.conversationAvatar} />
              <div>
                <span className={styles.conversationName}>
                  {getDisplayUser(conversation).firstName} {getDisplayUser(conversation).lastName}
                </span>
                <span className={styles.conversationLastMessage}>Sample Text</span>
              </div>
            </ConversationSidebarItem>
          ))}
        </ConversationSidebarContainer>
      </ConversationSidebarStyle>
    </>
  );
}

export default ConversationSidebar;
