import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, InputContainer, InputField, InputLabel, TextField } from '../../utils/styles';
import { searchUsers } from '../../utils/api';
import { AppDispatch } from '../../store';
import { createConversationThunk } from '../../store/slices/conversation-slice';
import useDebounce from '../../hooks/useDebounce';
import SelectedRecipientPill from '../recipient/selected-recipient-chip';
import RecipientResultContainer from '../recipient/recipient-result-container';
import styles from './index.module.scss';
import RecipientField from '../recipient/recipient-field';
import { createGroupThunk } from '../../store/slices/group-slice';

type Props = {
  closeModal: () => void;
  type: ConversationSelectedType;
};

export default function CreateConversationForm({ closeModal, type }: Props) {
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const debouncedValue = useDebounce<typeof query>(query, 1000);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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

  const onSubmit = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!message) return;

      if (type === 'private' && selectedUser) {
        const messageParams = {
          email: selectedUser.email,
          message
        };
        dispatch(createConversationThunk(messageParams))
          .unwrap()
          .then(({ data }) => {
            closeModal();
            navigate(`/conversations/${data.id}`);
          })
          .catch((err) => console.log(err));
      }

      if (type === 'group' && selectedUsers.length > 0) {
        const emails = selectedUsers.map((userItem) => userItem.email);
        dispatch(createGroupThunk(emails))
          .unwrap()
          .then(({ data }) => {
            closeModal();
            navigate(`/groups/${data.id}`);
          })
          .catch((err) => console.log(err));
      }
    },
    [closeModal, dispatch, message, navigate, selectedUser, selectedUsers, type]
  );

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
    setUsers([]);
    setQuery('');
  }, []);

  const handleMultipleUserSelect = useCallback(
    (user: User) => {
      const exists = selectedUsers.find((userItem) => user.email === userItem.email);
      if (exists) return;
      setSelectedUsers((prev) => [...prev, user]);
      console.log(selectedUsers);
    },
    [selectedUsers]
  );

  const removeAllSelectedUsers = useCallback(() => {
    setQuery('');
    setUsers([]);
    setSelectedUsers([]);
  }, []);

  const saveResults = useCallback(() => {
    setQuery('');
    setUsers([]);
  }, []);

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <RecipientField
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        setQuery={setQuery}
        type={type}
      />
      {!selectedUser && users.length > 0 && query && (
        <RecipientResultContainer
          removeAllSelectedUsers={removeAllSelectedUsers}
          userResults={users}
          handleSelectUser={handleSelectUser}
          handleMultipleUserSelect={handleMultipleUserSelect}
          saveResults={saveResults}
          type={type}
        />
      )}
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
        </InputContainer>
      </section>
      <Button type="submit">Create Conversation</Button>
    </form>
  );
}
