'use client';

import styles from "./list.module.css";
import { useSkillContext } from "@/context/Skill/SkillContext";
import axios from "axios";
import { useEffect, useState } from "react";

export function List() {

  const { companyId, setArticleId, setIsArticleList, setIsArticleDetail, handleReset } = useSkillContext();

  type Article = {
    subgenre_id: number
    subgenre_name: string,
    id: number,
    title: string,
    description: string,
    aImgPath: string,
    is_edit: boolean,
    is_public: boolean,
    create_at: string,
    favorite_count: number
  }

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/findPostList`, { params: { companyId } })
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.error(err));
  }, [companyId]);

  return (
    <>
      <section className={styles.container}>
        {articles.map((article) => (
          <div key={article.id} className={styles.content} onClick={() => { setArticleId(article.id); handleReset(); setIsArticleList(false); setIsArticleDetail(true) }}>
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
