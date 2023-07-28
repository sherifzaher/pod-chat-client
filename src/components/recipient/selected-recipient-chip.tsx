import { CircleX } from 'akar-icons';
import { Dispatch, SetStateAction } from 'react';
import { SelectedRecipientPillStyle } from '../../utils/styles';

type Props = {
  user: User;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
};

export default function SelectedRecipientPill({ user, setSelectedUser }: Props) {
  return (
    <SelectedRecipientPillStyle>
      <div className="container">
        <span>{user.email}</span>
        <CircleX className="icon" size="20px" onClick={() => setSelectedUser(undefined)} />
      </div>
    </SelectedRecipientPillStyle>
  );
}
