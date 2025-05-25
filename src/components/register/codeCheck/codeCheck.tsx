import Link from "next/link";

import { useRegisterContext } from "@/context/Register/RegisterContext";
import styles from "./codeCheck.module.css";

export function CodeCheck() {
  const {code, inputCode, isCodeEmpty, codeCheckErr, handleInputCode, handleCodeCheck} = useRegisterContext();

  return (
    <main className={styles.container}>
      <h3>認証コード確認</h3>
      {codeCheckErr && <h6 className={styles.error}>認証コードが違います。<br/>メールを確認して再度入力してください。</h6>}
      <p>メールアドレス送信された<br/>6桁の認証コードを入力してください。</p>
      <form onSubmit={handleCodeCheck} method="post" className={styles.form}>
        <div>
          <h6>認証コード入力</h6>
          {isCodeEmpty && <p className={styles.error}>認証番号は必須項目です。</p>}
          <input type="text" value={inputCode} placeholder="認証コードを入力してください。" onChange={(e) => handleInputCode(e)} />
        </div>
        <div className={styles.btnBx}>
          <Link href={"/"}>キャンセル</Link>
          <button type="submit">認証コード照会</button>
        </div>
      </form>
    </main>
  );
}
