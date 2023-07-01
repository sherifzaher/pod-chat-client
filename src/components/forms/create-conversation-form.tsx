import {useDispatch} from "react-redux";
import styles from './index.module.scss';
import {Button, InputContainer, InputField, InputLabel, TextField} from "../../utils/styles";

export default function CreateConversationForm() {
  const dispatch = useDispatch();

  return (
    <form className={styles.createConversationForm}>
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          <InputField />
        </InputContainer>
      </section>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField />
        </InputContainer>
      </section>
      <Button onClick={(e) => {
        e.preventDefault();
        // dispatch(addConversation({ id:1,  }))
      }}>Create Conversation</Button>
    </form>
  );
}
