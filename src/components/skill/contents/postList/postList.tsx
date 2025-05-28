'use client';

import axios from "axios";
import { useSkillContext } from "@/context/Skill/SkillContext";
import { useEffect, useMemo } from "react";

import styles from "./postList.module.css";

export function PostList() {
  const { userId, articles, isAllStatus, isPublicStatus, isPrivateStatus, isEditStatus, search, setArticleId, setIsArticleList, setIsArticleEdit, handleReset, setArticles } = useSkillContext();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/findArticlesByUserId`, { params: { userId } })
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.error(err));
  }, [userId, setArticles]);

  const displayedArticles = useMemo(() => {
    if (isAllStatus) {
      return articles.filter(article => article.title.match(search));
    } else if (isEditStatus) {
      return articles.filter(article => article.is_edit && article.title.match(search));
    } else if (isPublicStatus) {
      return articles.filter(article => article.is_public && !article.is_edit && article.title.match(search));
    } else if (isPrivateStatus) {
      return articles.filter(article => !article.is_public && !article.is_edit && article.title.match(search));
    } else {
      return [];
    }
  }, [articles, isAllStatus, isPublicStatus, isPrivateStatus, isEditStatus, search]);

  return (
    <>
      <section className={styles.container}>
        {displayedArticles && displayedArticles.map(article => (
          <div key={article.id} className={styles.content} onClick={() => { setArticleId(article.id); handleReset(); setIsArticleList(false); setIsArticleEdit(true) }}>
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
        ))}
      </section>
    </>
  );
}
