import { CircleX } from 'akar-icons';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { SelectedRecipientPillStyle } from '../../utils/styles';

type Props = {
  user: User | undefined;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
  type: ConversationSelectedType;
};

export default function SelectedRecipientPill({
  user,
  setSelectedUser,
  setSelectedUsers,
  type
}: Props) {
  const handleUserClick = useCallback(() => {
    if (type === 'private') {
      return setSelectedUser(undefined);
    }
    setSelectedUsers((prev) => prev.filter((userItem) => userItem.email !== user?.email));
  }, [type, setSelectedUsers, setSelectedUser, user?.email]);

  return (
    <SelectedRecipientPillStyle>
      <div className="container">
        <span>{user?.email}</span>
        <CircleX className="icon" size="20px" onClick={handleUserClick} />
      </div>
    </SelectedRecipientPillStyle>
  );
}
