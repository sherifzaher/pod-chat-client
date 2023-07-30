import { useSelector } from 'react-redux';
import {
  ConversationScrollableContainer,
  ConversationSearchbar,
  ConversationSidebarHeader,
  ConversationSidebarStyle,
  ConversationSidebarContainer
} from '../../utils/styles';

import ConversationTab from './conversation-tab';
import ConversationSidebarItem from './conversation-sidebar-item';
import GroupSidebarItem from '../groups/group-sidebar-item';
import { RootState } from '../../store';

export default function ConversationSidebar() {
  const selectedConversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const conversations = useSelector((state: RootState) => state.conversations.conversations);
  const groups = useSelector((state: RootState) => state.groups.groups);

  return (
    <ConversationSidebarStyle>
      <ConversationSidebarHeader>
        <ConversationSearchbar placeholder="Search for Conversations" />
      </ConversationSidebarHeader>
      <ConversationTab />
      <ConversationScrollableContainer>
        <ConversationSidebarContainer>
          {selectedConversationType === 'private'
            ? conversations.map((conversation) => (
                <ConversationSidebarItem conversation={conversation} key={conversation.id} />
              ))
            : groups.map((group) => <GroupSidebarItem group={group} key={group.id} />)}
        </ConversationSidebarContainer>
      </ConversationScrollableContainer>
    </ConversationSidebarStyle>
  );
}
