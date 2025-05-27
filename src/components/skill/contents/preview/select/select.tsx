import axios from "axios";
import styles from "./select.module.css";
import { useState } from "react";
import { useSkillContext } from "@/context/Skill/SkillContext";

export function Select({ articleId, handleShow }: { articleId: number, handleShow: () => void; }) {
  const { handleReset, setIsArticleList, setIsPostList } = useSkillContext();
  const [isPublic, setIsPublic] = useState(false);

  const handleChange = () => {
    setIsPublic((prev) => !prev);
  }

  const handleSubmit = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/postStatus`, { isPublic, articleId })
      .then(() => {
        handleReset();
        setIsArticleList(false);
        setIsPostList(true);
      })
      .catch((err) => console.error(err));
  }

  return (
    <section className={styles.container}>
      <div className={styles.form}>
        <p>公開方式を選択してください。</p>
        <div className={styles.checkBx}>
          <div onClick={handleChange}>
            <div>
              <div className={`${isPublic ? styles.select : styles.notselect}`}></div>
              <span>公開</span>
            </div>
            <p>全てのユーザーが閲覧可能です。</p>
          </div>
          <div onClick={handleChange}>
            <div>
              <div className={`${isPublic ? styles.notselect : styles.select}`}></div>
              <span>非公開</span>
            </div>
            <p>所属会社のユーザーのみ閲覧可能です。</p>
          </div>
        </div>
        <div className={styles.btnBx}>
          <button className={styles.post} type="button" onClick={handleSubmit}>投稿する</button>
          <button className={styles.cancel} type="button" onClick={handleShow}>キャンセル</button>
        </div>
      </div>
    </section>
  );
}
