import { useEffect, useState } from "react";

import styles from "./statusList.module.css";
import { useSkillContext } from "@/context/Skill/SkillContext";

export function StatusList() {
  const {setIsAllStatus, setIsPublicStatus, setIsPrivateStatus, setIsEditStatus} = useSkillContext();

  const AllStatus = [
    {
      name: "すべて表示",
    },
    {
      name: "公開中",
    },
    {
      name: "限定公開中",
    },
    {
      name: "編集中",
    }
  ];

  const [isShow, setIsShow] = useState(false);
  const [status, setStatus] = useState(AllStatus[0].name);

  const handleShow = () => {
    setIsShow((prev) => !prev);
  };

  useEffect(() => {
    setIsAllStatus(true);
  }, [setIsAllStatus]);

  const handleStatusChange = (staName: string) => {
    setIsAllStatus(false);
    setIsPublicStatus(false);
    setIsPrivateStatus(false);
    setIsEditStatus(false);

    setStatus(staName);
    if (staName === AllStatus[0].name) {setIsAllStatus(true);}
    if (staName === AllStatus[1].name) {setIsPublicStatus(true);}
    if (staName === AllStatus[2].name) {setIsPrivateStatus(true);}
    if (staName === AllStatus[3].name) {setIsEditStatus(true);}
    setIsShow((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleShow} className={`${isShow && styles.show}`}>{status}</button>
      {isShow &&
        <div>
          {AllStatus.map((sta, index) => (
            <h5 key={index} onClick={() => handleStatusChange(sta.name)}>{sta.name}</h5>
          ))}
        </div>
      }
    </div>
  );
}
