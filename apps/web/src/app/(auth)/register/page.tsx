import { AuthLayout } from '@/features/auth/components/auth-layout';
import { RegisterForm } from '@/features/auth/components/register-form';

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
