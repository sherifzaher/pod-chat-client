import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import CreateConversationModal from "@/components/modals/create-conversation-modal";
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
  const [showModal,setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}
      <ConversationSidebarStyle>
        <ConversationSidebarHeader>
          <h1>Conversations</h1>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div onClick={() => setShowModal(prev  => !prev)}>
            <TbEdit size="30" />
          </div>
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
    </>
  );
}

export default ConversationSidebar;
