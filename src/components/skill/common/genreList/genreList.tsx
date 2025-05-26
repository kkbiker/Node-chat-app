'use client';

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { useSkillContext } from "@/context/Skill/SkillContext";
import styles from "./genreList.module.css";

export function GenreList({ setPostGenre, setIsPostGenreEmpty }: { setPostGenre?: (value: string) => void, setIsPostGenreEmpty?: (value: boolean) => void }) {
  const { isPost, genres, genre, setGenreId, setIsArticleList, setIsArticleGenre, setGenre, setIsEditing, handleReset } = useSkillContext();

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
    if (!isPost) {
      handleReset();
    } else {
      if (setPostGenre !== undefined) {
        setPostGenre(name);
      }
      setIsEditing(true);
    }
  }, [isPost, handleReset, setGenre, setGenreId, setIsShow, setIsEditing, setPostGenre]);

  const handleSearchGenre = useCallback((id: number, name: string) => {
    handleGenre(id, name);

    if (name !== genres[0].name) {
      setIsArticleList(false);
      setIsArticleGenre(true);

      axios
        .get(`${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/findByGenre`,
          { params: { genre } }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [genre, handleGenre, genres, setIsArticleList, setIsArticleGenre]);

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
                  <h5 key={subgenre.id} onClick={() => `${isPost ? handleGenre(subgenre.id, subgenre.name) : handleSearchGenre(subgenre.id, subgenre.name)}`}>{subgenre.name}</h5>
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
