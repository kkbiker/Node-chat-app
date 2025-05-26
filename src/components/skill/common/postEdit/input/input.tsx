import { Subpost } from "@oriComponents/skill/post/subpost/subpost";
import { GenreList } from "../../genreList/genreList";
import styles from "./input.module.css";

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
  fileInputRef: HTMLInputElement | null,
  subFileInputRefs: (HTMLInputElement | null)[],
  setPostGenre: (value: string) => void,
  isPostGenreEmpty: boolean,
  setIsPostGenreEmpty: (value: boolean) => void,
  title: string
  isTitleEmpty: boolean,
  isTitleSize: boolean,
  description: string,
  isDescriptionEmpty: boolean,
  isDescriptionSize: boolean,
  fileSizeOver: boolean,
  handleTitle: (value: string) => void,
  handleDescription: (value: string) => void,
  handleFile: (value: File | null) => void,
  handleFileDelete: () => void,
  subposts: SubpostType[],
  subpostserrors: SubpostError[],
  handleSubTitle: (index: number, value: string) => void,
  handleContent: (index: number, value: string) => void,
  handleSubImg: (index: number, value: File | null) => void,
  handleDeleteSubImg: (index: number) => void,
  handleAdd: () => void,
  handlereduse: (index: number) => void
}

export function Input({
  fileInputRef,
  subFileInputRefs,
  setPostGenre,
  isPostGenreEmpty,
  setIsPostGenreEmpty,
  title,
  isTitleEmpty,
  isTitleSize,
  description,
  isDescriptionEmpty,
  isDescriptionSize,
  fileSizeOver,
  handleTitle,
  handleDescription,
  handleFile,
  handleFileDelete,
  subposts,
  subpostserrors,
  handleSubTitle,
  handleContent,
  handleSubImg,
  handleDeleteSubImg,
  handleAdd,
  handlereduse
}: Props) {
  return (
    <section className={styles.container}>
      {/* <div className={styles.post}>
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
      </div> */}
      {subposts.map((sub, index) => {
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
                return subFileInputRefs[index];
              },
              set current(val: HTMLInputElement | null) {
                subFileInputRefs[index] = val;
              }
            }}
          />
        );
      })}
      <div className={styles.add}>
        <button type="button" onClick={handleAdd}>＋サブタイトルを追加する</button>
      </div>
    </section>
  );
}
