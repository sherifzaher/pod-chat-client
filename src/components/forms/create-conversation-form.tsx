import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import styles from './index.module.scss';
import { Button, InputContainer, InputField, InputLabel, TextField } from '../../utils/styles';
import {createConversationThunk} from "../../store/slices/conversation-slice";
import {AppDispatch} from "../../store";

type Props = {
  closeModal: () => void;
}

export default function CreateConversationForm({ closeModal }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<CreateConversationParams>({});

  const onSubmit = (data: CreateConversationParams) => {
    dispatch(createConversationThunk(data))
      .unwrap()
      .then(() => closeModal())
      .catch((err) => console.log(err))
  }

  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          <InputField {...register('email', { required: 'Email is required' })} />
        </InputContainer>
      </section>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField {...register('message')} />
        </InputContainer>
      </section>
      <Button type="submit">
        Create Conversation
      </Button>
    </form>
  );
}
