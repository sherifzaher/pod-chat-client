import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from './index.module.scss';
import {postLoginUser} from "../../utils/api";
import {Button, InputContainer, InputField, InputLabel} from "../../utils/styles";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserCredentialsParams>();
  const navigate = useNavigate();
  const onSubmit = async (data: UserCredentialsParams) => {
    try {
      await postLoginUser(data);
      navigate('/conversations');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
