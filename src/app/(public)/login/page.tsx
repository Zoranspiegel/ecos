import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return (
    <main className="h-full flex items-center justify-center">
      <AuthForm type="login" />
    </main>
  );
}
