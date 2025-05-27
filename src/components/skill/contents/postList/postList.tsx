'use client';

import axios from "axios";
import { useSkillContext } from "@/context/Skill/SkillContext";
import { useEffect, useState } from "react";

import styles from "./postList.module.css";

export function PostList() {
  const { userId, setArticleId, setIsArticleList, setIsArticleEdit, handleReset } = useSkillContext();

  type Article = {
    subgenreId: number
    subgenreName: string,
    id: number,
    title: string,
    description: string,
    aImgPath: string,
    isEdit: boolean,
    isPublic: boolean,
    createAt: string,
    favoriteCount: number
  }

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/findArticlesByUserId`, { params: { userId } })
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.error(err));
  }, [userId]);
  return (
    <>
      <section className={styles.container}>
        {articles && articles.map((article, index) => (
          <div key={index} className={styles.content} onClick={() => {setArticleId(article.id); handleReset(); setIsArticleList(false); setIsArticleEdit(true)}}>
            <div className={styles.imgBx}>
              <p>{article.subgenreName}</p>
            </div>
            <div className={styles.contentBx}>
              <h4>{article.title}</h4>
              <p>投稿日: {article.createAt}</p>
              <div>
                <p>★{article.favoriteCount}</p>
                <p className={`${article.isEdit ? styles.yellow : `${article.isPublic ? null : styles.pink}`}`}>
                  {article.isEdit ? "非公開" : `${article.isPublic ? "公開" : "限定公開"}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
