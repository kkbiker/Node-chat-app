'use client';

import { useAuth } from "@/hooks/auth/auth"

export default function Login() {
  const { name, handleSetName, handleLogin } = useAuth();

  return (
    <main>
      <form onSubmit={() => handleLogin()} method="post">
        <input type="text" value={name} onChange={(e) => handleSetName(e)} />
        <button type="submit">ログイン</button>
      </form>
    </main>
  );
}
