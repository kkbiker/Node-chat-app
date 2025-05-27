'use client';

import axios from "axios";
import { useSkillContext } from "@/context/Skill/SkillContext";
import { useEffect } from "react";

import styles from "./postList.module.css";

export function PostList() {
  const { userId, articles, setArticleId, setIsArticleList, setIsArticleEdit, handleReset, setArticles } = useSkillContext();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/findArticlesByUserId`, { params: { userId } })
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.error(err));
  }, [userId, setArticles]);

  return (
    <>
      <section className={styles.container}>
        {articles && articles.map((article, index) => (
          <div key={index} className={styles.content} onClick={() => {setArticleId(article.id); handleReset(); setIsArticleList(false); setIsArticleEdit(true)}}>
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
