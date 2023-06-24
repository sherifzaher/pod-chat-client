import { ChangeEvent } from "react";
import { Button, InputContainer, InputField, InputLabel } from '@/utils/styles';

import {Link} from "react-router-dom";
import styles from './index.module.scss';

function RegisterForm() {
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
        <InputField id="password" type="password" name="password" />
      </InputContainer>
      <Button className={styles.button}>Create My Account</Button>
      <div className={styles.footerText}>
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </form>
  );
}

export default RegisterForm;
