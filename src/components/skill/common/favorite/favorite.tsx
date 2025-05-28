"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { useSkillContext } from "@/context/Skill/SkillContext";
import styles from "./favorite.module.css";

export function Favorite({setShowFavorite}: {setShowFavorite: (value: boolean) => void}) {
  const { userId, setArticleId, handleHeader } = useSkillContext();

  type Favorite = {
    id: number,
    articleid: number,
    title: string,
    genre_name: string
  }

  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/showFavorite`, { params: { userId } })
      .then((res) => {
        console.log(res.data);
        setFavorites(res.data);
      })
      .catch((err) => console.error(err));
  }, [userId, setArticleId]);

  return (
    <div className={styles.container}>
      {favorites.map(favorite => (
        <div key={favorite.id} onClick={() => {handleHeader("favorite", favorite.articleid); setShowFavorite(false)}}>
          <span>{favorite.genre_name}</span>
          <p>{favorite.title}</p>
        </div>
      ))}
    </div>
  );
}
