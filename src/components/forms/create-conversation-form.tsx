import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  RecipientResultContainer,
  RecipientResultItem,
  TextField
} from '../../utils/styles';
import { createConversationThunk } from '../../store/slices/conversation-slice';
import { AppDispatch } from '../../store';
import useDebounce from '../../hooks/useDebounce';
import { searchUsers } from '../../utils/api';
import SelectedRecipientPill from '../recipient/selected-recipient-chip';

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
      if (!selectedUser || !message) return;

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
    },
    [closeModal, dispatch, message, navigate, selectedUser]
  );

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
    setUsers([]);
    setQuery('');
  }, []);

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          {!selectedUser ? (
            <InputField onChange={(e) => setQuery(e.target.value)} />
          ) : (
            <SelectedRecipientPill user={selectedUser} setSelectedUser={setSelectedUser} />
          )}
        </InputContainer>
        <RecipientResultContainer>
          {!selectedUser &&
            query &&
            users.map((user) => (
              <RecipientResultItem key={user.id} onClick={() => handleSelectUser(user)}>
                <span>{user.email}</span>
              </RecipientResultItem>
            ))}
        </RecipientResultContainer>
      </section>
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
