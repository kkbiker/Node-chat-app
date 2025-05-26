import styles from "./header.module.css";

export function Header() {
  return (
    <div className={styles.container}> 
      <button type="button">編集</button>
      <button type="button" className={styles.post}>投稿</button>
    </div>
  );
}
