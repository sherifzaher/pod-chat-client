import RegisterForm from '@/components/forms/register-form';
import { Page } from '@/utils/styles';

function RegisterPage() {
  return (
    <Page display="flex" alignItems="center" justifyContent="center">
      <RegisterForm />
    </Page>
  );
}

export default RegisterPage;
