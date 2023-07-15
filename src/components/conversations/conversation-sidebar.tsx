import { useState } from 'react';
import { useSelector } from 'react-redux';

import { TbEdit } from 'react-icons/tb';

import { RootState } from '../../store';
import CreateConversationModal from '../modals/create-conversation-modal';
import {
  ConversationSidebarContainer,
  ConversationSidebarHeader,
  ConversationSidebarStyle
} from '../../utils/styles';
import ConversationSelected from "./conversation-selected";
import ConversationSidebarItem from "./conversation-sidebar-item";
import GroupSidebarItem from "../groups/group-sidebar-item";

function ConversationSidebar() {
  const [showModal, setShowModal] = useState(false);
  const selectedConversationType = useSelector((state: RootState) => state.selectedConversationType.type);

  const conversations = useSelector((state: RootState) => state.conversations.conversations);
  const groups = useSelector((state: RootState) => state.groups.groups);

  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <ConversationSidebarStyle>
        <ConversationSidebarHeader>
          <h1>Conversations</h1>
          <div onClick={() => setShowModal((prev) => !prev)}>
            <TbEdit size="30" />
          </div>
        </ConversationSidebarHeader>
        <ConversationSidebarContainer>
        <ConversationSelected />
          {selectedConversationType === 'private'
            ? conversations.map((conversation) => ( <ConversationSidebarItem conversation={conversation} key={conversation.id} /> ))
            : groups.map((group) => (<GroupSidebarItem group={group} key={group.id} />))
          }
        </ConversationSidebarContainer>
      </ConversationSidebarStyle>
    </>
  );
}

export default ConversationSidebar;
