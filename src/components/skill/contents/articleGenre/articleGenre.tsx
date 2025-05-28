import { useSkillContext } from "@/context/Skill/SkillContext";
import styles from "./articleGenre.module.css";
import { useState } from "react";

export function ArticleGenre() {
  const { articles, setArticleId, setIsArticleList, setIsArticleDetail, handleReset } = useSkillContext();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePrev = () => {
    if (currentPage === 1) { return }

    setCurrentPage((prev) => prev - 1);
  }

  const handleNext = () => {
    if (currentPage === totalPages) { return }

    setCurrentPage((prev) => prev + 1);
  }
  
  return (
    <>
      <section className={styles.container}>
        {currentArticles && currentArticles.map((article, index) => (
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

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button type="button" onClick={handlePrev}>前のページ</button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={currentPage === idx + 1 ? styles.activePage : ""}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button type="button" onClick={handleNext}>次のページ</button>
        </div>
      )}
    </>
  );
}
