import styles from "./header.module.css";
import { useSkillContext } from "@/context/Skill/SkillContext";
import { Favorite } from "../favorite/favorite";
import { useState } from "react";

export function Header() {
  const {isAdmin, isPost, handleHeader} = useSkillContext();

  const [showFavorite, setShowFavorite] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.logoBx}>
        <h3 className="Playfair capital" onClick={() => handleHeader("head", 0)}>skill share</h3>
        {isAdmin && <button type="button" className={styles.pink} onClick={() => handleHeader("admin", 0)}>管理画面</button>}
      </div>
      <div className={styles.contentBx}>
        <button type="button" className={styles.pink} onClick={() => setShowFavorite((prev) => !prev)}>◉お気に入り</button>
        {!isPost && <button type="button" onClick={() => handleHeader("post", 0)}>＋投稿する</button>}
        <button type="button" onClick={() => handleHeader("postList", 0)} >投稿記事一覧</button>
        {showFavorite && <Favorite setShowFavorite={setShowFavorite} />}
      </div>
    </div>
  );
}
