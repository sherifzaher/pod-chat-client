import { Dispatch, SetStateAction } from 'react';

import { InputContainer, InputField, InputLabel, RecipientChipContainer } from '../../utils/styles';
import SelectedRecipientChip from './selected-recipient-chip';

type Props = {
  selectedUser: User | undefined;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  selectedUsers: User[];
  setSelectedUsers: Dispatch<SetStateAction<User[]>>;
  setQuery: Dispatch<SetStateAction<string>>;
  type: ConversationSelectedType;
};

export default function RecipientField({
  selectedUser,
  setSelectedUser,
  selectedUsers,
  setSelectedUsers,
  setQuery,
  type
}: Props) {
  const renderRecipients = () => {
    if (!selectedUser && selectedUsers.length === 0) {
      return <InputField onChange={(e) => setQuery(e.target.value)} />;
    }

    if (selectedUser && type === 'private') {
      return (
        <SelectedRecipientChip
          setSelectedUsers={setSelectedUsers}
          user={selectedUser}
          setSelectedUser={setSelectedUser}
          type={type}
        />
      );
    }

    return selectedUsers.map((user) => (
      <SelectedRecipientChip
        setSelectedUsers={setSelectedUsers}
        key={user.id}
        user={user}
        setSelectedUser={setSelectedUser}
        type={type}
      />
    ));
  };
  return (
    <section>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <RecipientChipContainer>{renderRecipients()}</RecipientChipContainer>
      </InputContainer>
    </section>
  );
}
