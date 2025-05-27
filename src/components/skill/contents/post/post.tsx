'use client';

import { Header } from "./header/header";
import { Subpost } from "./subpost/subpost";
import { useSkillInput } from "@/hooks/skill/useSkillInput";
import { GenreList } from "../../common/genreList/genreList";
import styles from "./post.module.css";

export function Post() {
  const {
    fileInputRef,
    subFileInputRefs,
    postGenre,
    setPostGenre,
    isPostGenreEmpty,
    setIsPostGenreEmpty,
    title,
    isTitleEmpty,
    setIsTitleEmpty,
    isTitleSize,
    description,
    isDescriptionEmpty,
    setIsDescriptionEmpty,
    isDescriptionSize,
    titleImg,
    fileSizeOver,
    handleTitle,
    handleDescription,
    handleFile,
    handleFileDelete,
    subposts,
    subpostserrors,
    setSubposterrors,
    handleSubTitle,
    handleContent,
    handleSubImg,
    handleDeleteSubImg,
    handleAdd,
    handlereduse
  } = useSkillInput();

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
            {isPostGenreEmpty && <h5 className={styles.errormessage}>ジャンルを選択してください。</h5>}
          </div>
          <div className={styles.title}>
            <h2>タイトル</h2>
            <input type="text" value={title} onChange={handleTitle} />
            {isTitleEmpty && <h5 className={styles.errormessage}>タイトルを入力してください。</h5>}
            {isTitleSize && <h5 className={styles.errormessage}>タイトルは50文字以内で入力してください。</h5>}
          </div>
          <div className={styles.description}>
            <h2>概要</h2>
            <textarea value={description} onChange={handleDescription} rows={5}>{description}</textarea>
            {isDescriptionEmpty && <h5 className={styles.errormessage}>概要を入力してください。</h5>}
            {isDescriptionSize && <h5 className={styles.errormessage}>概要は1000文字以内で入力してください。</h5>}
          </div>
          <div className={styles.img}>
            <h2>写真選択</h2>
            <div>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFile} />
              <button type="button" onClick={handleFileDelete}>削除</button>
            </div>
            {fileSizeOver && <h5 className={styles.errormessage}>ファイルのサイズは5MB以内にしてください。</h5>}
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
