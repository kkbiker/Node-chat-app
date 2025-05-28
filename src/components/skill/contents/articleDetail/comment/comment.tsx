import { useCallback, useEffect, useState } from "react";
import styles from "./comment.module.css";
import axios from "axios";
import { useSkillContext } from "@/context/Skill/SkillContext";

export function Comment({handleShowProblem}: {handleShowProblem: () => void}) {
  const {userId, articleId} = useSkillContext();

  type Comment = {
    id: number,
    comment: string,
    user_id: number,
    user_name: string,
    create_at: string
  }

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const [isCommentSize, setIsCommentSize] = useState(false);

  const handleComment = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsCommentEmpty(!(value.trim().length > 0));
    setIsCommentSize(value.length > 200);
    setComment(value);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/getComments`, {params: {articleId}})
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.error(err));
  }, [articleId]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.trim().length === 0 || isCommentSize) { 
      setIsCommentEmpty(true);
      return; 
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/insertComment`, {userId, articleId, comment})
      .then((res) => {
        setComments(res.data);
        setComment("");
      })
      .catch((err) => console.error(err));
  }, [comment, userId, articleId, isCommentSize]);

  return (
    <section className={styles.container}>
      <h3>コメント一覧</h3>
      <form className={styles.form} onSubmit={handleSubmit} method="post">
        <input type="text" value={comment} onChange={handleComment} />
        <button type="submit">送信</button>
      </form>
      {isCommentEmpty && <h4 className={styles.errormessage}>コメントを入力してください。</h4>}
      {isCommentSize && <h4 className={styles.errormessage}>コメントは200文字以内で入力してください。</h4>}
      <p></p>
      <ul className={styles.commentBx}>
        {comments.map(comment => (
          <li key={comment.id} className={`${userId === comment.user_id ? styles.userComment : ""}`}>
            <p>{comment.comment}</p>
            <div>
              <p>{comment.create_at}</p>
              <p>{comment.user_name}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.btnBx}>
        <button type="button" onClick={handleShowProblem}>管理者に問題を報告する</button>
      </div>
    </section>
  );
}
