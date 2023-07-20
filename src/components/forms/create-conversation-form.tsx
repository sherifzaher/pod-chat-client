import { useForm } from 'react-hook-form';
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
  TextField
} from '../../utils/styles';
import { createConversationThunk } from '../../store/slices/conversation-slice';
import { AppDispatch } from '../../store';
import useDebounce from '../../hooks/useDebounce';
import { searchUsers } from '../../utils/api';

type Props = {
  closeModal: () => void;
  type: ConversationSelectedType;
};

export default function CreateConversationForm({ closeModal, type }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateConversationParams>({});

  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

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
    }
  }, [debouncedValue]);

  const onSubmit = useCallback(
    (conversationParams: CreateConversationParams) => {
      dispatch(createConversationThunk(conversationParams))
        .unwrap()
        .then(({ data }) => {
          closeModal();
          navigate(`/conversations/${data.id}`);
        })
        .catch((err) => console.log(err));
    },
    [closeModal, dispatch, navigate]
  );

  return (
    <form className={styles.createConversationForm} onSubmit={handleSubmit(onSubmit)}>
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          <InputField onChange={(e) => setQuery(e.target.value)} />
        </InputContainer>
        <RecipientResultContainer>asd</RecipientResultContainer>
      </section>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField />
        </InputContainer>
      </section>
      <Button type="submit">Create Conversation</Button>
    </form>
  );
}
