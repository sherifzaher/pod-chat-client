import {Button, InputContainer, InputField, InputLabel, TextField} from "@/utils/styles";
import styles from './index.module.scss';

export default function CreateConversationForm(){
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
              <TextField  />
            </InputContainer>
          </section>
          <Button onClick={(e) => e.preventDefault()}>Create Conversation</Button>
        </form>
    )
}
