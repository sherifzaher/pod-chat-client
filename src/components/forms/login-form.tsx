import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, InputContainer, InputField, InputLabel } from '@/utils/styles';

import styles from './index.module.scss';

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          {...register('email', { required: 'Email is required.' })}
          id="email"
          name="email"
        />
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          {...register('password', { required: 'password is required.' })}
          type="password"
          id="password"
          name="password"
        />
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
