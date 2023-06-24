import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputContainer, InputField, InputLabel } from '@/utils/styles';

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
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField id="password" name="password" />
      </InputContainer>
      <Button className={styles.button}>Login</Button>
      <div className={styles.footerText}>
        <span>Dont have an account? </span>
        <Link to="/register">Sign Up</Link>
      </div>
    </form>
  );
}

export default RegisterForm;
