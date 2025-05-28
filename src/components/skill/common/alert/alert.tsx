import { useSkillContext } from "@/context/Skill/SkillContext";
import styles from "./alert.module.css";

export function Alert() {
  const {setShowAlert, ChangeView, whHead} = useSkillContext();

  return (
    <section className={styles.container}>
      <div>
        <p>編集中の記事がありますが、ページを変更しますか？<br/>編集内容は保存されません。</p>
        <div className={styles.btnBx}>
          <button type="button" onClick={() => setShowAlert(false)}>編集を続ける</button>
          <button type="button" onClick={() => ChangeView(whHead)} >OK</button>
        </div>
      </div>
    </section>
  );
}
