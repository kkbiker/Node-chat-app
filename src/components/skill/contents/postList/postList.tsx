'use client';

import axios from "axios";
import { useSkillContext } from "@/context/Skill/SkillContext";
import { useEffect, useState } from "react";

import styles from "./postList.module.css";

export function PostList() {
  const { userId, setArticleId, setIsArticleList, setIsArticleEdit, handleReset } = useSkillContext();

  type Article = {
    subgenreId: number
    subgenreName: string
    userName: string,
    id: number,
    title: string,
    description: string,
    aImgPath: string,
    edit: boolean,
    public: boolean,
    createAt: string,
    subArticles: SubArticle[],
    favoriteCount: number
  }

  type SubArticle = {
    subTitle: string,
    content: string,
    saImgPath: string
  }

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/findArticlesByUserId`, { params: { userId } })
      .then((res) => {
        console.log(res.data);
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
              <p>投稿者: {article.userName}</p>
              <p>投稿日: {article.createAt}</p>
              <div>
                <p>★{article.favoriteCount}</p>
                <p className={`${article.edit ? styles.yellow : `${article.public ? null : styles.pink}`}`}>
                  {article.edit ? "非公開" : `${article.public ? "公開" : "限定公開"}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
