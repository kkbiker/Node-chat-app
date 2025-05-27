import { useSkillContext } from "@/context/Skill/SkillContext";
import styles from "./header.module.css";

export function Header({articleId, handleShow}: {articleId: number, handleShow: () => void;}) {
  const { setArticleId, setIsArticleList, setIsArticleEdit, handleReset } = useSkillContext();

  return (
    <div className={styles.container}> 
      <button type="button" onClick={() => {setArticleId(articleId); handleReset(); setIsArticleList(false); setIsArticleEdit(true)}}>編集</button>
      <button type="button" className={styles.post} onClick={handleShow}>投稿</button>
    </div>
  );
}
