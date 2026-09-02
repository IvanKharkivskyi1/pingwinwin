import { AuthLayout } from '../auth-layout/auth-layout';
import { LoginForm } from './login-form';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login"
      footerText="You don't have an account?"
      footerLinkText="Register"
      footerLinkHref="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
