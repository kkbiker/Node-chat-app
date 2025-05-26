// 'use client';

// import { useSkillContext } from "@/context/Skill/SkillContext";
// import { useEffect, useState } from "react";
// import { GenreList } from "../../common/genreList/genreList";
// import axios from "axios";

// import styles from "./articleEdit.module.css";

// export function ArticleEdit() {
//   const { articleId, setIsEditing } = useSkillContext();

//   type Article = {
//     subgenreId: number
//     subgenreName: string
//     userName: string,
//     id: number,
//     title: string,
//     description: string,
//     aImgPath: string,
//     isEdit: boolean,
//     isPublic: boolean,
//     createAt: string,
//     subArticles: SubArticle[],
//     favoriteCount: number
//   }

//   type SubArticle = {
//     subTitle: string,
//     content: string,
//     saImgPath: string
//   }

//   const [article, setArticle] = useState<Article>();

//   useEffect(() => {
//     axios
//       .get(`${process.env.NEXT_PUBLIC_JAVA_API_URL}/skill/findArticleByid`, { params: { articleId } })
//       .then((res) => {
//         console.log(res.data);
//         setArticle(res.data);
//       })
//       .catch((err) => console.error(err));
//   }, [articleId]);
//   return (
//     <>
//       <section className={styles.container}>
//         <div className={styles.post}>
//           <div className={styles.genre}>
//             <h2>投稿ジャンル選択</h2>
//             <GenreList setPostGenre={setPostGenre} setIsPostGenreEmpty={setIsPostGenreEmpty} />
//             {isPostGenreEmpty && <h4 className={styles.errormessage}>ジャンルを選択してください。</h4>}
//           </div>
//           <div className={styles.title}>
//             <h2>タイトル</h2>
//             <input type="text" value={title} onChange={handleTitle} />
//             {isTitleEmpty && <h4 className={styles.errormessage}>タイトルを入力してください。</h4>}
//             {isTitleSize && <h4 className={styles.errormessage}>タイトルは50文字以内で入力してください。</h4>}
//           </div>
//           <div className={styles.description}>
//             <h2>概要</h2>
//             <textarea value={description} onChange={handleDescription} rows={5}>{description}</textarea>
//             {isDescriptionEmpty && <h4 className={styles.errormessage}>概要を入力してください。</h4>}
//             {isDescriptionSize && <h4 className={styles.errormessage}>概要は1000文字以内で入力してください。</h4>}
//           </div>
//           <div className={styles.img}>
//             <h2>写真選択</h2>
//             <div>
//               <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFile} />
//               <button type="button" onClick={handleFileDelete}>削除</button>
//             </div>
//             {fileSizeOver && <h4 className={styles.errormessage}>ファイルのサイズは5MB以内にしてください。</h4>}
//           </div>
//         </div>
//         {subposts.map((sub, index) => {
//           if (!subFileInputRefs.current[index]) {
//             subFileInputRefs.current[index] = null;
//           }

//           return (
//             <Subpost
//               key={index}
//               index={index}
//               subTitle={sub.subTitle}
//               content={sub.content}
//               handleSubTitle={handleSubTitle}
//               handleContent={handleContent}
//               handleSubImg={handleSubImg}
//               handleDeleteSubImg={handleDeleteSubImg}
//               handlereduse={handlereduse}
//               subpostserrors={subpostserrors[index]}
//               fileInputRef={{
//                 get current() {
//                   return subFileInputRefs.current[index];
//                 },
//                 set current(val: HTMLInputElement | null) {
//                   subFileInputRefs.current[index] = val;
//                 }
//               }}
//             />
//           );
//         })}
//         <div className={styles.add}>
//           <button type="button" onClick={handleAdd}>＋サブタイトルを追加する</button>
//         </div>
//       </section>
//     </>
//   );

// }
