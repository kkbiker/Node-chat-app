import Link from "next/link";

import styles from "./sign.module.css";

type Props = {
  isSignIn: boolean,
  isRegister: boolean
}

export function Sign( {isSignIn, isRegister}: Props ) {
  return (
    <>
      <div className={styles.container}>
        {!isSignIn && <Link href="/login">ログイン</Link>}
        {!isRegister && <Link href="/register">サインイン</Link>}
      </div>
    </>
  );
}
