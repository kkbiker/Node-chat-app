import Link from "next/link";

import { useRegisterContext } from "@/context/Register/RegisterContext";
import styles from "./mailsend.module.css";

export function Mailsend() {
  const {email, isEmailEmpty, mailsendErr, handleEmail, handleMailsend} = useRegisterContext();

  return (
    <main className={styles.container}>
      <h3>メールアドレス確認</h3>
      {mailsendErr && <h6 className={styles.error}>メール送信に失敗しました。<br/>再度メールアドレスを入力してください。</h6>}
      <p>入力されたメールアドレスに<br/>6桁の認証番号を送信します。</p>
      <form onSubmit={handleMailsend} method="post" className={styles.form}>
        <div>
          <h6>メールアドレス</h6>
          {isEmailEmpty && <p className={styles.error}>メールアドレスは必須項目です。</p>}
          <input type="text" value={email} placeholder="メールアドレスを入力してください。" onChange={(e) => handleEmail(e)} />
        </div>
        <div className={styles.btnBx}>
          <Link href={"/"}>キャンセル</Link>
          <button type="submit">メール送信</button>
        </div>
      </form>
    </main>
  );
}
