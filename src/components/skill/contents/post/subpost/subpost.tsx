import styles from "./subpost.module.css";

type Props = {
  index: number,
  subTitle: string,
  content: string,
  handleSubTitle: (index: number, value: string) => void,
  handleContent: (index: number, value: string) => void,
  handleSubImg: (index: number, value: File | null) => void,
  handlereduse: (index: number) => void,
  handleDeleteSubImg: (index: number) => void,
  subpostserrors?: {
    isSubTitleEmpty: boolean,
    isSubTitleSize: boolean,
    isContentEmpty: boolean,
    isContentSize: boolean
  }
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function Subpost({ index, subTitle, content, handleSubTitle, handleContent, handleSubImg, handlereduse, handleDeleteSubImg, subpostserrors, fileInputRef }: Props) {

  return (
    <div className={styles.container}>
      <div className={styles.remove}>
        <button type="button" onClick={() => handlereduse(index)}>ーサブタイトルを削除する。</button>
      </div>
      <div className={styles.title}>
        <h2>サブタイトル</h2>
        <input type="text" value={subTitle} onChange={(e) => handleSubTitle(index, e.target.value)} />
        {subpostserrors?.isSubTitleEmpty && <h5 className={styles.errormessage}>サブタイトルを入力してください。</h5>}
        {subpostserrors?.isSubTitleSize && <h5 className={styles.errormessage}>サブタイトルは50文字以内で入力してください。</h5>}
      </div>
      <div className={styles.description}>
        <h2>内容</h2>
        <textarea value={content} onChange={(e) => handleContent(index, e.target.value)} rows={5}>{content}</textarea>
        {subpostserrors?.isContentEmpty && <h5 className={styles.errormessage}>内容を入力してください。</h5>}
        {subpostserrors?.isContentSize && <h5 className={styles.errormessage}>内容は1000文字以内で入力してください。</h5>}
      </div>
      <div className={styles.img}>
        <h2>写真選択</h2>
        <div>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => handleSubImg(index, e.target.files?.[0] ?? null)} />
          <button type="button" onClick={() => handleDeleteSubImg(index)}>削除</button>
        </div>
      </div>
    </div>
  );
}
