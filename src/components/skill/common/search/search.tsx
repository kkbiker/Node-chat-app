'use client';

import axios from "axios";
import { useCallback, useState } from "react";

import { useSkillContext } from "@/context/Skill/SkillContext";
import { GenreList } from "../genreList/genreList";
import { StatusList } from "../statusList/statusList";
import styles from "./search.module.css";

export function Search() {
  const { isPost, isPreview, isArticleEdit, isPostList, search, setSearch, setArticles, setIsArticleList, setIsArticleGenre, handleReset } = useSkillContext();

  const [isEmpty, setIsEmpty] = useState(false);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(false);
    const value = e.target.value.trim();
    setSearch(value);
  }, [setSearch]);

  const handleSendSearch = useCallback(() => {
    if (search === "") {
      setIsEmpty(true);

      setTimeout(() => {
        setIsEmpty(false);
      }, 5000);

      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/findArticlesByTitle`,
        { params: { search } }
      )
      .then((res) => {
        setArticles(res.data);
        handleReset();
        setIsArticleList(false);
        setIsArticleGenre(true);
      })
      .catch((err) => console.error(err));
  }, [search, setArticles, handleReset, setIsArticleList, setIsArticleGenre]);

  return (
    <>
      {(!isPost && !isPreview && !isArticleEdit) &&
        <div className={styles.container}>
          <div className={styles.search}>
            {isPostList ? <StatusList /> : <GenreList />}
            <div className={styles.inputBx}>
              <input type="text" value={search} placeholder="記事検索" onChange={handleSearch} />
              {!isPostList && <button type="button" onClick={handleSendSearch}>🔍</button>}
            </div>
          </div>
          {isEmpty && <h4>検索項目を入力してください。</h4>}
        </div>
      }
    </>
  );
}
