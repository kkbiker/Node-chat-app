import { useSkillContext } from "@/context/Skill/SkillContext";
import styles from "./articleGenre.module.css";

export function ArticleGenre() {
  const { articles, setArticleId, setIsArticleList, setIsArticleDetail, handleReset } = useSkillContext();

  return (
    <>
      <section className={styles.container}>
        {articles && articles.map((article, index) => (
          <div key={index} className={styles.content} onClick={() => { setArticleId(article.id); handleReset(); setIsArticleList(false); setIsArticleDetail(true) }}>
            <div className={styles.leftBx}>
              <div className={styles.imgBx}>
                <p>{article.subgenre_name}</p>
              </div>
              <div className={styles.contentBx}>
                <h4>{article.title}</h4>
                <p>投稿日: {article.create_at}</p>
                <div>
                  <p>★{article.favorite_count}</p>
                  <p className={`${article.is_edit ? styles.yellow : `${article.is_public ? null : styles.pink}`}`}>
                    {article.is_edit ? "非公開" : `${article.is_public ? "公開" : "限定公開"}`}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.rightBx}>
              <p>概要</p>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
