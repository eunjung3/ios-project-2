import { AppHeader } from "../../components/layout/AppHeader";
import { LoginForm } from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="mw-app h-[100dvh] overflow-hidden flex flex-col">
      <AppHeader />

      <main className="flex-1 min-h-0 flex items-center justify-center px-5">
        <LoginForm />
      </main>
    </div>
  );
}
