import { AuthLayout } from '../auth-layout/auth-layout';
import { RegisterForm } from './register-form';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Register"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
