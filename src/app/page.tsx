import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>Welcome My App</h1>
      <section className={styles.links}>
        <ul>
          <li><Link href={"/login"}>ログインはこちら</Link></li>
          <li><Link href={"/register"}>ユーザー登録はこちら</Link></li>
          <li><Link href={"/chat"}>チャット機能はこちら</Link></li>
        </ul>
      </section>
    </main>
  );
}
