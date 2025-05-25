'use client';

import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuth"
import styles from "./login.module.css";

export default function Login() {
  const { email, password, showPassword, loginErr, handleEmail, handlePassword, handleShow, handleLogin } = useAuth();

  return (
    <main className={styles.container}>
      <h2>ログイン</h2>
      {loginErr && <p className={styles.error}>メールアドレスまたはパスワードが間違っています。</p>}
      <form onSubmit={handleLogin} method="post" className={styles.form}>
        <div>
          <h6>メールアドレス</h6>
          <input type="text" placeholder="メールアドレスを入力してください。" value={email} onChange={(e) => handleEmail(e)} />
        </div>
        <div>
          <h6>パスワード</h6>
          <div>
            {showPassword ?
              <input type="text" value={password} placeholder="パスワードを入力してください。" onChange={(e) => handlePassword(e)} />
              :
              <input type="password" value={password} placeholder="パスワードを入力してください。" onChange={(e) => handlePassword(e)} />
            }
            <button type="button" onClick={handleShow}>{showPassword ? "非表示" : "表示"}</button>
          </div>
        </div>
        <div className={styles.btnBx}>
          <Link href={"/"}>キャンセル</Link>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </main>
  );
}
