'use client';

import Link from "next/link";

import { useRegisterContext } from "@/context/Register/RegisterContext";
import styles from "./register.module.css";
import { useAuth } from "@/hooks/auth/useAuth";

export function Register() {
  const { companyName, isCompanyNameEmpty, isCompanyNameSize, companyId, isCompanyIdEmpty, name, isNameEmpty, isNameSize, email, password, isPasswordEmpty, isPasswordSize, isPasswordPattern, registErr, isMaster, handleName, handlePassword, handleCompanyName, handleCompanyId, handleSubmit } = useRegisterContext();

  const {showPassword, handleShow} = useAuth();

  return (
    <main className={styles.container}>
      <h3>ユーザー登録</h3>
      {registErr && <h6 className={styles.error}>ユーザー登録に失敗しました。</h6>}
      <form onSubmit={handleSubmit} method="post" className={styles.form}>
        <div>
          {isMaster ?
            <>
              <h6>会社名登録</h6>
              {isCompanyNameEmpty && <p className={styles.error}>会社名は必須項目です。</p>}
              {isCompanyNameSize && <p className={styles.error}>会社名は50文字以内で入力してください。</p>}
              <input type="text" value={companyName} placeholder="会社名を入力してください。" onChange={(e) => handleCompanyName(e)} />
            </>
            :
            <>
              <h6>会社ID</h6>
              {isCompanyIdEmpty && <p className={styles.error}>会社IDは必須項目です。</p>}
              <input type="text" value={companyId} placeholder="会社IDを入力してください。" onChange={(e) => handleCompanyId(e)} />
            </>
          }
        </div>
        <div>
          <h6>ユーザー名</h6>
          {isNameEmpty && <p className={styles.error}>ユーザー名は必須項目です。</p>}
          {isNameSize && <p className={styles.error}>ユーザー名は20文字以内で入力してください。</p>}
          <input type="text" value={name} placeholder="ユーザー名を入力してください。" onChange={(e) => handleName(e)} />
        </div>
        <div>
          <h6>メールアドレス</h6>
          <p className={styles.email}>{email}</p>
        </div>
        <div>
          <h6>パスワード</h6>
          {isPasswordEmpty && <p className={styles.error}>パスワードは必須項目です。</p>}
          {isPasswordSize && <p className={styles.error}>パスワードは50文字以内で入力してください。</p>}
          {isPasswordPattern && <p className={styles.error}>パスワードには大小半角英数字をそれぞれ1文字以上含めてください。</p>}
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
          <button type="submit">登録</button>
        </div>
      </form>
    </main>
  );
}
