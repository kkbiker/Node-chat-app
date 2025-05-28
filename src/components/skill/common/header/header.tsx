import styles from "./header.module.css";
import { useSkillContext } from "@/context/Skill/SkillContext";

export function Header() {
  const {isAdmin, isPost, handleHeader} = useSkillContext();

  return (
    <div className={styles.container}>
      <div className={styles.logoBx}>
        <h3 className="Playfair capital" onClick={() => handleHeader("head")}>skill share</h3>
        {isAdmin && <button type="button" className={styles.pink} onClick={() => handleHeader("admin")}>管理画面</button>}
      </div>
      <div className={styles.contentBx}>
        <button type="button" className={styles.pink} onClick={() => handleHeader("favorite")}>◉お気に入り</button>
        {!isPost && <button type="button" onClick={() => handleHeader("post")}>＋投稿する</button>}
        <button type="button" onClick={() => handleHeader("postList")} >投稿記事一覧</button>
      </div>
    </div>
  );
}
