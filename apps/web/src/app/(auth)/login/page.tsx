import { AuthLayout } from '@/features/auth/components/auth-layout';
import { LoginForm } from '@/features/auth/components/login-form';

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
