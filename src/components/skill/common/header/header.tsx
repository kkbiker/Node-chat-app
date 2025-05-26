import styles from "./header.module.css";
import { useSkillContext } from "@/context/Skill/SkillContext";

export function Header() {
  const {isAdmin, isPost, setIsAdmin, setIsPost, setIsArticleList, setIsPostList, handleReset} = useSkillContext();

  return (
    <div className={styles.container}>
      <div className={styles.logoBx}>
        <h3 className="Playfair capital" onClick={() => handleReset()}>skill share</h3>
        {isAdmin && <button type="button" className={styles.pink} onClick={() => {handleReset(); setIsArticleList(false); setIsAdmin(true);}}>管理画面</button>}
      </div>
      <div className={styles.contentBx}>
        <button type="button" className={styles.pink}>◉お気に入り</button>
        {!isPost && <button type="button" onClick={() => {handleReset(); setIsArticleList(false); setIsPost(true);}}>＋投稿する</button>}
        <button type="button" onClick={() => {handleReset(); setIsArticleList(false); setIsPostList(true);}} >投稿記事一覧</button>
      </div>
    </div>
  );
}
