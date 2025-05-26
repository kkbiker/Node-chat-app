'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import styles from "./header.module.css";
import { Nav } from "./nav/nav";
import { Sign } from "./sign/sign";

export function Header() {
  const pathname = usePathname();

  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  type User = {
    name: string,
    is_master: boolean,
  }

  useEffect(() => {
    if (pathname === "/" || pathname === "/login" || pathname === "/register") {
      localStorage.removeItem("user");

      setIsLogin(false);
      setIsSignIn(pathname === "/login");
      setIsRegister(pathname === "/register")
      return;
    } else {
      setIsLogin(true);

      const userData = localStorage.getItem("user");
      if (!userData) return;
      const user: User = JSON.parse(userData);
      setIsAdmin(user.is_master);
    }
  }, [pathname]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.imgBx}>
            <Image src="/logo.png" alt="logo_img" width={80} height={40} />
            <Image src="/logo_dark.png" alt="logo_img" width={80} height={40} className="dark" />
          </div>
          {isLogin ?
            <Nav isAdmin={isAdmin} />
            :
            <Sign isSignIn={isSignIn} isRegister={isRegister}
            />}
        </div>

      </header>
    </>
  );
}
