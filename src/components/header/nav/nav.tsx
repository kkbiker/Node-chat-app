'use client';

import Image from "next/image";

import styles from "./nav.module.css";
import { useNavContext } from "@/context/Header/NavContext";

export function Nav({isAdmin}: {isAdmin: boolean}) {
  const {isProject, isChat, isCalender, isTodo, isAI, isSkill, isMember, handleProject, handleChat, handleCalender, handleTodo, handleAI, handleSkill, handleMember, handleShowUser} = useNavContext();

  const navs = [
    {
      img_path: "/project.png",
      dark_img_path: "/project_dark.png",
      select: isProject,
      handle: handleProject,
      alt: "project_img"
    },
    {
      img_path: "/chat.png",
      dark_img_path: "/chat_dark.png",
      select: isChat,
      handle: handleChat,
      alt: "chat_img"
    },
    {
      img_path: "/calender.png",
      dark_img_path: "/calender_dark.png",
      select: isCalender,
      handle: handleCalender,
      alt: "calender_img"
    },
    {
      img_path: "/todo.png",
      dark_img_path: "/todo_dark.png",
      select: isTodo,
      handle: handleTodo,
      alt: "todo_img"
    },
    {
      img_path: "/AI.png",
      dark_img_path: "/AI_dark.png",
      select: isAI,
      handle: handleAI,
      alt: "AI_img"
    },
    {
      img_path: "/skills.png",
      dark_img_path: "/skills_dark.png",
      select: isSkill,
      handle: handleSkill,
      alt: "skills_img"
    },
    ...(isAdmin ? [{
      img_path: "/member.png",
      dark_img_path: "/member_dark.png",
      select: isMember,
      handle: handleMember,
      alt: "member_img"
    }] : []),
    {
      img_path: "/user_default.png",
      dark_img_path: "/user_default.png",
      select: false,
      handle: handleShowUser,
      alt: "user_img"
    }
  ]

  return (
    <>
      <ul className={styles.container}>
        {navs.map(nav => (
          <div key={nav.alt} className={`${nav.alt !== "user_img" ? "" : styles.user} ${nav.select ? styles.select : ""}`} onClick={nav.handle} >
            <Image src={nav.img_path} alt={nav.alt} width={40} height={40} />
            <Image src={nav.dark_img_path} alt={nav.alt} width={40} height={40} className={`${nav.alt !== "user_img" ? "dark" : styles.user}`} />
          </div>
        ))}
      </ul>
    </>
  );
}
