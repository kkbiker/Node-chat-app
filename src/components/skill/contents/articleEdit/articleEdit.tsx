'use client';

import { useEffect } from "react";
import axios from "axios";

import { Header } from "../post/header/header";
import { GenreList } from "../../common/genreList/genreList";
import { Subpost } from "../post/subpost/subpost";
import { useSkillContext } from "@/context/Skill/SkillContext";
import { useSkillInput } from "@/hooks/skill/useSkillInput";
import styles from "./articleEdit.module.css";

export function ArticleEdit() {
  const { articleId, setGenreId, setGenre } = useSkillContext();

  const { subposts, setSubposts, title, setTitle, description, setDescription, titleImg, setTitleImg, postGenre, setPostGenre, isPostGenreEmpty, setIsPostGenreEmpty, handleTitle, isTitleEmpty, isTitleSize, setIsTitleEmpty, handleDescription, isDescriptionEmpty, setIsDescriptionEmpty, isDescriptionSize, fileInputRef, handleFile, handleFileDelete, fileSizeOver, handleSubTitle, handleContent, handleSubImg, handleDeleteSubImg, handlereduse, subpostserrors, setSubposterrors, subFileInputRefs, handleAdd } = useSkillInput();

  useEffect(() => {
    const postId = articleId;

    axios
      .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/findArticleByid`, { params: { postId } })
      .then((res) => {
        setGenreId(res.data.subgenreId);
        setGenre(res.data.subgenreName);
        setPostGenre(res.data.subgenreName);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setTitleImg(res.data.aImgPath);
        setSubposts(res.data.subArticles);
      })
      .catch((err) => console.error(err));
  }, [articleId, setGenreId, setGenre, setPostGenre, setTitle, setDescription, setTitleImg, setSubposts]);
  return (
    <>
      <Header
        postGenre={postGenre}
        title={title}
        description={description}
        titleImg={titleImg}
        subposts={subposts}
        setSubposterrors={setSubposterrors}
        isTitleSize={isTitleSize}
        isDescriptionSize={isDescriptionSize}
        setIsPostGenreEmpty={setIsPostGenreEmpty}
        setIsTitleEmpty={setIsTitleEmpty}
        setIsDescriptionEmpty={setIsDescriptionEmpty}
        fileSizeOver={fileSizeOver}
      />
      <section className={styles.container}>
        <div className={styles.post}>
          <div className={styles.genre}>
            <h2>投稿ジャンル選択</h2>
            <GenreList setPostGenre={setPostGenre} setIsPostGenreEmpty={setIsPostGenreEmpty} />
            {isPostGenreEmpty && <h4 className={styles.errormessage}>ジャンルを選択してください。</h4>}
          </div>
          <div className={styles.title}>
            <h2>タイトル</h2>
            <input type="text" value={title} onChange={handleTitle} />
            {isTitleEmpty && <h4 className={styles.errormessage}>タイトルを入力してください。</h4>}
            {isTitleSize && <h4 className={styles.errormessage}>タイトルは50文字以内で入力してください。</h4>}
          </div>
          <div className={styles.description}>
            <h2>概要</h2>
            <textarea value={description} onChange={handleDescription} rows={5}>{description}</textarea>
            {isDescriptionEmpty && <h4 className={styles.errormessage}>概要を入力してください。</h4>}
            {isDescriptionSize && <h4 className={styles.errormessage}>概要は1000文字以内で入力してください。</h4>}
          </div>
          <div className={styles.img}>
            <h2>写真選択</h2>
            <div>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFile} />
              <button type="button" onClick={handleFileDelete}>削除</button>
            </div>
            {fileSizeOver && <h4 className={styles.errormessage}>ファイルのサイズは5MB以内にしてください。</h4>}
          </div>
        </div>
        {subposts.map((sub, index) => {
          if (!subFileInputRefs.current[index]) {
            subFileInputRefs.current[index] = null;
          }

          return (
            <Subpost 
              key={index}
              index={index}
              subTitle={sub.subTitle}
              content={sub.content}
              handleSubTitle={handleSubTitle}
              handleContent={handleContent}
              handleSubImg={handleSubImg}
              handleDeleteSubImg={handleDeleteSubImg}
              handlereduse={handlereduse}
              subpostserrors={subpostserrors[index]}
              fileInputRef={{
                get current() {
                  return subFileInputRefs.current[index];
                },
                set current(val: HTMLInputElement | null) {
                  subFileInputRefs.current[index] = val;
                }
              }}
            />
          );
        })}
        <div className={styles.add}>
          <button type="button" onClick={handleAdd}>＋サブタイトルを追加する</button>
        </div>
      </section>
    </>
  );

}
