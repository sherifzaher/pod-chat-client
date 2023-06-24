import { Button, InputContainer, InputField, InputLabel } from '@/utils/styles';
import styles from './index.module.scss';

function RegisterForm() {
  return (
    <form className={styles.form}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField id="email" name="email" />
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField id="firstName" name="firstName" />
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField id="lastName" name="lastName" />
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField id="password" name="password" />
      </InputContainer>
      <Button className={styles.button}>Create My Account</Button>
    </form>
  );
}

export default RegisterForm;
