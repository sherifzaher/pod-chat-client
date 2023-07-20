import { ChatAdd, Person, SignOut } from 'akar-icons';
import { useState } from 'react';
import {
  UserAvatar,
  UserSidebarBottom,
  UserSidebarStyle,
  UserSidebarTop,
  UserSidebarTopIcons
} from '../../utils/styles';
import styles from './index.module.scss';
import avatar from '../../__assets__/avatar_1.png';
import CreateConversationModal from '../modals/create-conversation-modal';

export default function UserSidebar() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <CreateConversationModal setShowModal={setShowModal} />}
      <UserSidebarStyle>
        <UserSidebarTop>
          <UserAvatar src={avatar} width="55px" />
          <hr className={styles.hr} />
          <UserSidebarTopIcons>
            <ChatAdd onClick={() => setShowModal(true)} size={38} />
            <Person size={38} />
          </UserSidebarTopIcons>
        </UserSidebarTop>
        <UserSidebarBottom>
          <SignOut size={38} />
        </UserSidebarBottom>
      </UserSidebarStyle>
    </>
  );
}
