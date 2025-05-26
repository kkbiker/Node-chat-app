'use client';

import { useSkillContext } from "@/context/Skill/SkillContext";
import { useCallback, useState } from "react";

import styles from "./search.module.css";
import axios from "axios";
import { GenreList } from "../genreList/genreList";

export function Search() {
  const { isPost, isPreview, isArticleEdit, setIsArticleList, setIsArticleGenre, handleReset } = useSkillContext();

  const [search, setSearch] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(false);
    const value = e.target.value.trim();
    setSearch(value);
  }, []);

  const handleSendSearch = useCallback(() => {
    if (search === "") {
      setIsEmpty(true);

      setTimeout(() => {
        setIsEmpty(false);
      }, 5000);

      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/search`,
        { params: { search } }
      )
      .then(() => {
        handleReset();
        setIsArticleList(false);
        setIsArticleGenre(true);
      })
      .catch((err) => console.error(err));
  }, [search, handleReset, setIsArticleList, setIsArticleGenre]);

  return (
    <>
      {(!isPost && !isPreview && !isArticleEdit) &&
        <div className={styles.container}>
          <div className={styles.search}>
            <GenreList />
            <div className={styles.inputBx}>
              <input type="text" value={search} placeholder="記事検索" onChange={handleSearch} />
              <button type="button" onClick={handleSendSearch}>🔍</button>
            </div>
          </div>
          {isEmpty && <h4>検索項目を入力してください。</h4>}
        </div>
      }
    </>
  );
}
