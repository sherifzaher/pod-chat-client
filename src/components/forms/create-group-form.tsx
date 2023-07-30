import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  InputContainer,
  InputLabel,
  RecipientChipContainer,
  TextField
} from '../../utils/styles';
import { searchUsers } from '../../utils/api';

import GroupRecipientsField from '../recipient/group-recipients-field';
import RecipientResultContainer from '../recipient/recipient-result-container';
import SelectedRecipientChip from '../recipient/selected-recipient-chip';

import useDebounce from '../../hooks/useDebounce';
import { createGroupThunk } from '../../store/slices/group-slice';
import { AppDispatch } from '../../store';

import styles from './index.module.scss';

type Props = {
  closeModal: () => void;
};

export default function CreateGroupForm({ closeModal }: Props) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');

  const debouncedValue = useDebounce<typeof query>(query, 1000);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUsers.length) return;

    const emails = selectedUsers.map((userItem) => userItem.email);
    dispatch(createGroupThunk(emails))
      .unwrap()
      .then(({ data }) => {
        closeModal();
        navigate(`/groups/${data.id}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (debouncedValue) {
      setSearching(true);
      searchUsers(debouncedValue)
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err))
        .finally(() => setSearching(false));
    } else {
      setUsers([]);
    }
  }, [debouncedValue]);

  const handleSelectUser = useCallback(
    (user: User) => {
      const exists = selectedUsers.find((userData) => userData.id === user.id);
      if (exists) return;

      setSelectedUsers((prev) => [...prev, user]);
    },
    [selectedUsers]
  );

  const removeUser = (userId: number) => {
    setSelectedUsers((prev) => prev.filter((userData) => Number(userData.id) !== userId));
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.createConversationForm}>
      <RecipientChipContainer>
        {selectedUsers.map((user) => (
          <SelectedRecipientChip
            key={user.id}
            user={user}
            handleOnClick={() => removeUser(Number(user.id))}
          />
        ))}
      </RecipientChipContainer>
      <GroupRecipientsField setQuery={setQuery} />
      {users.length > 0 && query && (
        <RecipientResultContainer userResults={users} handleSelectUser={handleSelectUser} />
      )}
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
        </InputContainer>
      </section>
      <Button disabled={selectedUsers.length === 0} type="submit">
        Create Group
      </Button>
    </form>
  );
}
