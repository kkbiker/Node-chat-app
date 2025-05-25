import Link from "next/link";

import { useRegisterContext } from "@/context/Register/RegisterContext";
import styles from "./selectRegistType.module.css";

export function SelectRegistType() {
  const {handleMaster, handleUser} = useRegisterContext();

  return (
    <main className={styles.container}>
      <h3>登録方法選択</h3>
      <p>下記より登録方法を選択してください。</p>
      <div className={styles.selecter} onClick={handleMaster}>
        <h6>新規で会社を登録</h6>
        <p>ご自身の会社名を正式名称で記載の上、ユーザーの新規登録
          を行なってください。<br />
          <span>この際に登録されたユーザーが代表者となり、</span>
          会社メンバーの役職制限やアクセス制限を行うことができ
          ます。</p>
      </div>
      <div className={styles.selecter} onClick={handleUser}>
        <h6>所属会社でユーザー登録</h6>
        <p>ご自身の会社IDを記載の上、ユーザーの新規登録を行なってください。</p>
      </div>
    </main >
  );
}
