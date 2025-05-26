'use client';

import Image from "next/image";
import styles from "./list.module.css";
import { useSkillContext } from "@/context/Skill/SkillContext";
import axios from "axios";
import { useEffect, useState } from "react";

export function List() {

  const {genres, setIsArticleList, setIsArticleGenre, setGenre, handleReset} = useSkillContext();

  type ArticleList = {
    genreId: number,
    genreName: string,
    subgenreId: number,
    subgenreName: string,
    articles: Article[]
  }

  type Article = {
    id: number,
    title: string,
    description: string,
    userName: string,
    createAt: string,
    favoriteCount: string,
    isPublic: boolean
  }

  const [articles, setArticles] = useState<ArticleList[]>([]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/showAll`, {params: {genres}})
  //     .then((res) => {
  //       setArticles(res.data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []); 

  const articlesList = [
    {
      genre: "プログラミング",
      subgenre: "一覧",
      articles: [
        {
          id: 1,
          imgPath: "skills_dark.png",
          title: "テストタイトル1",
          postman: "テストユーザー1",
          postDate: "3/6",
          favirites: 3,
          public: true
        },
        {
          id: 2,
          imgPath: "skills_dark.png",
          title: "テストタイトル2",
          postman: "テストユーザー2",
          postDate: "3/8",
          favirites: 1,
          public: true
        },
        {
          id: 3,
          imgPath: "skills_dark.png",
          title: "テストタイトル3",
          postman: "テストユーザー3",
          postDate: "3/9",
          favirites: 4,
          public: true
        },
        {
          id: 4,
          imgPath: "skills_dark.png",
          title: "テストタイトル4",
          postman: "テストユーザー4",
          postDate: "3/9",
          favirites: 6,
          public: true
        },
        {
          id: 5,
          imgPath: "skills_dark.png",
          title: "テストタイトル5",
          postman: "テストユーザー5",
          postDate: "3/12",
          favirites: 9,
          public: false
        }
      ]
    },
    {
      genre: "プログラミング",
      subgenre: "Java",
      articles: [
        {
          id: 6,
          imgPath: "skills_dark.png",
          title: "テストタイトル6",
          postman: "テストユーザー1",
          postDate: "3/6",
          favirites: 3,
          public: true
        },
        {
          id: 7,
          imgPath: "skills_dark.png",
          title: "テストタイトル7",
          postman: "テストユーザー2",
          postDate: "3/8",
          favirites: 1,
          public: false
        },
        {
          id: 8,
          imgPath: "skills_dark.png",
          title: "テストタイトル8",
          postman: "テストユーザー3",
          postDate: "3/9",
          favirites: 4,
          public: true
        },
        {
          id: 9,
          imgPath: "skills_dark.png",
          title: "テストタイトル9",
          postman: "テストユーザー4",
          postDate: "3/9",
          favirites: 6,
          public: true
        }
      ]
    },
  ]

  const handleSearchGenre = (name: string) => {
    setGenre(name);
    handleReset();
    if (name !== genres[0].name) {
      setIsArticleList(false);
      setIsArticleGenre(true);
    }
    
    axios
      .get(`${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/findByGenre`,
        { params: { name } }
      )
      .then((res) => {

      })
      .catch((err) => console.error(err));
  }

  return (
    <section className={styles.genres}>
      {articlesList.map(genre => (
        <section key={genre.subgenre} className={styles.genre}>
          <h2>{genre.genre}<span>{genre.subgenre}</span></h2>
          <div className={styles.contents}>
            {genre.articles.map(article => (
              <div key={article.id} className={styles.content}>
                <div className={styles.imgBx}>
                  <Image src={`/${article.imgPath}`} alt="article_img" width={120} height={120}></Image>
                </div>
                <div className={styles.contentBx}>
                  <h4>{article.title}</h4>
                  <p>投稿者: {article.postman}</p>
                  <p>投稿日: {article.postDate}</p>
                  <div>
                    <p>★{article.favirites}</p>
                    <p className={`${article.public ? null : styles.pink}`}>{article.public ? "公開" : "限定公開"}</p>
                  </div>
                </div>
              </div>
            ))}
            {genre.articles.length === 5 &&
              <div className={styles.btnBx}>
                <button type="button" onClick={() => handleSearchGenre(genre.genre)}><span>＋</span>もっと見る</button>
              </div>
            }
          </div>
        </section>
      ))}
    </section>
  );
}
