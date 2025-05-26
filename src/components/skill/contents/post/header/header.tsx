'use client';

import axios from "axios";
import { useCallback, useEffect } from "react";
import { useSkillContext } from "@/context/Skill/SkillContext";
import styles from "./header.module.css";

type SubpostType = {
  subTitle: string,
  content: string,
  imgPath: string,
  file: File | null
}

type SubpostError = {
  isSubTitleEmpty: boolean,
  isSubTitleSize: boolean,
  isContentEmpty: boolean,
  isContentSize: boolean
}

type Props = {
  postGenre: string,
  title: string,
  titleImg?: File | null,
  isTitleSize: boolean,
  description: string,
  isDescriptionSize: boolean,
  subposts: SubpostType[],
  setSubposterrors: (value: SubpostError[]) => void,
  setIsPostGenreEmpty: (value: boolean) => void,
  setIsTitleEmpty: (value: boolean) => void,
  setIsDescriptionEmpty: (value: boolean) => void,
  fileSizeOver: boolean
}

export function Header({ postGenre, title, titleImg, isTitleSize, description, isDescriptionSize, subposts, setSubposterrors, setIsPostGenreEmpty, setIsTitleEmpty, setIsDescriptionEmpty, fileSizeOver }: Props) {
  const { userId, genreId, postId, isEditing, setPostId, setArticleId, setIsArticleList, setIsPreview, setIsEditing, handleReset } = useSkillContext();

  useEffect(() => {
    setPostId(0);
  }, [setPostId]);

  const errorCheck = useCallback(() => {
    let haserror = false;

    if (postGenre === "" || title.trim() === "" || description.trim() === "" || isTitleSize || isDescriptionSize || fileSizeOver) {
      setIsPostGenreEmpty(postGenre === "");
      setIsTitleEmpty(title.trim() === "");
      setIsDescriptionEmpty(description.trim() === "");
      haserror = true;
    }

    const errors = subposts.map(subpost => {
      const error = {
        isSubTitleEmpty: subpost.subTitle.trim() === "",
        isSubTitleSize: subpost.subTitle.length > 50,
        isContentEmpty: subpost.content.trim() === "",
        isContentSize: subpost.content.length > 1000,
      }

      if (error.isSubTitleEmpty || error.isSubTitleSize || error.isContentEmpty || error.isContentSize) {
        haserror = true;
      }
      return error;
    });

    setSubposterrors(errors);

    return haserror;
  }, [postGenre, title, description, subposts, isTitleSize, isDescriptionSize, fileSizeOver, setIsDescriptionEmpty, setIsTitleEmpty, setIsPostGenreEmpty, setSubposterrors]);

  const save = async (imgPath: string | null) => {
    await saveSubpostsImg(subposts);

    axios
      .post(`${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/save`, { userId, genreId, postGenre, title, description, imgPath, subposts })
      .then((res) => {
        setPostId(res.data);
        setArticleId(res.data);
        setIsEditing(false);
      })
      .catch((err) => console.error(err));
  }

  const saveSubpostsImg = async (subposts: SubpostType[]) => {
    const uploadPromises = subposts.map(async (subpost, index) => {
      if (subpost.file !== null) {
        const formData = new FormData();
        formData.append("subTitleImg", subpost.file as File);
        formData.append("subpostId", String(index));
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/saveSubImg`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          subpost.imgPath = res.data;
        } catch (err) {
          console.error(err);
        }
      }
    });

    await Promise.all(uploadPromises);
  };

  const handleSave = useCallback(async () => {
    if (errorCheck()) return;

    const formData = new FormData();
    if (titleImg) {
      formData.append("titleImg", titleImg);
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/saveImg`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        await save(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      await save(null);
    }
  }, [postGenre, title, description, titleImg, subposts, errorCheck, save]);


  const update = async (imgPath: string | null) => {
    await saveSubpostsImg(subposts);

    axios
      .post(`${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/save`, { postId, userId, genreId, postGenre, title, description, imgPath, subposts })
      .then((res) => {
        setPostId(res.data);
        setArticleId(res.data);
        setIsEditing(false);
      })
      .catch((err) => console.error(err));
  }

  const handleUpdate = useCallback(async () => {
    if (errorCheck()) return;

    const formData = new FormData();
    if (titleImg) {
      formData.append("titleImg", titleImg);
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/saveImg`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        await update(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      await update(null);
    }
  }, [postId, postGenre, title, description, titleImg, subposts, errorCheck, update]);

  const handlePreview = useCallback(async () => {
    if (errorCheck()) return;

    if (postId !== 0) {
      handleUpdate();
    } else {
      handleSave();
    }

    handleReset();
    setIsArticleList(false);
    setIsPreview(true);
  }, [postId, errorCheck, handleUpdate, handleSave, handleReset, setIsArticleList, setIsPreview]);

  return (
    <div className={styles.container}>
      <div>
        <button type="button" onClick={() => (isEditing && postId !== 0) ? handleUpdate() : handleSave()}>下書き保存</button>
        {isEditing && <p>編集中</p>}
      </div>
      <button type="button" onClick={handlePreview} className={styles.preview}>プレビューを表示</button>
    </div>
  );
}
