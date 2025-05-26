'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./user.module.css";
import { useNavContext } from "@/context/Header/NavContext";

type User = {
  name: string;
  email: string;
  is_master: boolean;
}

export function User() {
  const {handleShowUser} = useNavContext();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (!userData) return;
    const user = JSON.parse(userData);
    setUser(user);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgBx}>
        <Image src="/user_default.png" alt="user_img" width={60} height={60}></Image>
      </div>
      <div className={styles.content}>
        <table>
          <tbody>
            <tr>
              <td>名前</td>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <td>メールアドレス</td>
              <td>{user?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.logout}>
        <Link href="/">ログアウト</Link>
        <button type="button" onClick={handleShowUser}></button>
      </div>
    </div>
  );
}
