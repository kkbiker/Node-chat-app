'use client';

import axios from "axios";
import { useEffect, useState } from "react";

import { useSkillContext } from "@/context/Skill/SkillContext";
import { Header } from "./header/header";
import styles from "./preview.module.css";
import Image from "next/image";

export function Preview() {
  const { postId } = useSkillContext();

  type Article = {
    subgenreId: number
    subgenreName: string
    userName: string,
    id: number,
    title: string,
    description: string,
    aImgPath: string,
    isEdit: boolean,
    isPublic: boolean,
    createAt: string,
    subArticles: SubArticle[],
    favoriteCount: number
  }

  type SubArticle = {
    subTitle: string,
    content: string,
    saImgPath: string
  }

  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    if (postId !== 0) {
      axios
        .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/findArticleByid`, { params: { postId } })
        .then((res) => {
          setArticle(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [postId]);

  return (
    <>
      <Header />
      <section className={styles.container}>
        <div className={styles.article}>
          <div className={styles.title}>
            <p>{article?.subgenreName}</p>
            <h3>{article?.title}</h3>
          </div>
          <div>
            <p>投稿者:{article?.userName}</p>
            <p>投稿日:{article?.createAt}</p>
            <p>★{article?.favoriteCount}</p>
          </div>
        </div>
        <p>{article?.description}</p>
        {article?.aImgPath && <div className={styles.ImgBx}><Image src={`${process.env.NEXT_PUBLIC_JAVA_API_URL}/img/${article?.aImgPath}`} alt="写真" /></div>}
        {Array.isArray(article?.subArticles) &&
          article.subArticles.map((subarticle, index) => (
            <div key={index} className={styles.subarticle}>
              <h4>・{subarticle.subTitle}</h4>
              <p>{subarticle.content}</p>
              {subarticle.saImgPath && (
                <div className={styles.ImgBx}>
                  <Image src={`${process.env.NEXT_PUBLIC_JAVA_API_URL}/img/${subarticle.saImgPath}`} alt="写真" />
                </div>
              )}
            </div>
          ))}
      </section>
    </>
  );
}
