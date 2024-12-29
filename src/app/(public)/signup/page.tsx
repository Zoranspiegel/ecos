import AuthForm from '@/components/AuthForm';

export default function SignupPage() {
  return (
    <main className="h-full flex items-center justify-center">
      <AuthForm type="signup" />
    </main>
  );
}
