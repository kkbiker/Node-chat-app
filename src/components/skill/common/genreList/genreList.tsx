'use client';

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { useSkillContext } from "@/context/Skill/SkillContext";
import styles from "./genreList.module.css";

export function GenreList({ setPostGenre, setIsPostGenreEmpty }: { setPostGenre?: (value: string) => void, setIsPostGenreEmpty?: (value: boolean) => void }) {
  const { companyId, isPost, isArticleEdit, genres, genre, setGenreId, setIsArticleList, setIsArticleGenre, setGenre, setArticles, setIsEditing, handleReset } = useSkillContext();

  const [isShow, setIsShow] = useState(false);

  const handleShow = () => {
    setIsShow((prev) => !prev);
    if (isPost && setIsPostGenreEmpty !== undefined) {
      setIsPostGenreEmpty(false);
    }
  }

  useEffect(() => {
    if (genres.length > 0) {
      setGenre(genres[0].name);
    }
    if (isPost) {
      setGenre("ジャンル選択");
    }
  }, [genres, isPost, setGenre]);

  const handleGenre = useCallback((id: number, name: string) => {
    setGenreId(id);
    setGenre(name);
    setIsShow((prev) => !prev);
    if (!isPost && !isArticleEdit) {
      handleReset();
    } else {
      if (setPostGenre !== undefined) {
        setPostGenre(name);
      }
      setIsEditing(true);
    }
  }, [isPost, isArticleEdit, handleReset, setGenre, setGenreId, setIsShow, setIsEditing, setPostGenre]);

  const handleSearchGenre = useCallback(async (id: number, name: string) => {
    setGenreId(id);
    setGenre(name);

    if (name !== genres[0].name) {
      setIsArticleList(false);
      setIsArticleGenre(true);

      axios
        .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/findByGenre`,
          { params: { id, companyId } }
        )
        .then((res) => {
          setArticles(res.data);
        })
        .catch((err) => console.error(err));
    } else {
      setIsArticleList(true);
      setIsArticleGenre(false);
    }

    setIsShow(false);
  }, [companyId, genres, setGenreId, setGenre, setIsArticleList, setIsArticleGenre, setArticles]);

  return (
    <>
      <div className={styles.genres}>
        <button onClick={handleShow} className={`${isShow && styles.show}`}>{genre}</button>
        {isShow &&
          <div>
            {genres.map(genre => (
              <div key={genre.id}>
                <h4 onClick={() => `${!isPost && handleSearchGenre(genre.id, genre.name)}`} className={`${!isPost && styles.nopost}`}>◉{genre.name}</h4>
                {genre.subgenres?.length > 1 ? genre.subgenres.map(subgenre => (
                  <h5 key={subgenre.id} onClick={() => `${isPost || isArticleEdit ? handleGenre(subgenre.id, subgenre.name) : handleSearchGenre(subgenre.id, subgenre.name)}`}>{subgenre.name}</h5>
                ))
                  :
                  null
                }
              </div>
            ))}
          </div>
        }
      </div>
    </>
  );
}
