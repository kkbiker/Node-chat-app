import { useCallback, useState } from "react";
import styles from "./problem.module.css";
import axios from "axios";

export function Problem({articleId, handleShowProblem}: {articleId: number, handleShowProblem: () => void}) {
  const [problem, setProblem] = useState("");
  const [isProblemEmpty, setIsProblemEmpty] = useState(false);
  const [isProblemSize, setIsProblemSize] = useState(false);

  const handleProblem = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setIsProblemEmpty(!(value.trim().length > 0));
    setIsProblemSize(value.length > 200);
    setProblem(value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/skill/problem`, {problem, articleId})
      .then(() => handleShowProblem())
      .catch((err) => console.error(err));
  }, [problem, articleId, handleShowProblem]);

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit} method="post" className={styles.form}>
        <textarea value={problem} onChange={handleProblem} rows={10}>{problem}</textarea>
        {isProblemEmpty && <p>問題を入力してください。</p>}
        {isProblemSize && <p>問題は200文字以内で入力してください。</p>}
        <div className={styles.btnBx}>
          <button type="button" onClick={handleShowProblem}>キャンセル</button>
          <button type="submit">問題を報告する</button>
        </div>
      </form>
    </section>
  );
}
