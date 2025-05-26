'use client';

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

type NavContext = {
  isProject: boolean;
  isChat: boolean;
  isCalender: boolean;
  isTodo: boolean;
  isAI: boolean;
  isSkill: boolean;
  isMember: boolean;
  isShowUser: boolean;
  handleProject: () => void;
  handleChat: () => void;
  handleCalender: () => void;
  handleTodo: () => void;
  handleAI: () => void;
  handleSkill: () => void;
  handleMember: () => void;
  handleShowUser: () => void;
}

const NavContext = createContext<NavContext | null>(null);

export const NavProvider = ({ children }: { children: React.ReactNode; }) => {
  const router = useRouter();

  const [isProject, setIsProject] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [isCalender, setIsCalender] = useState(false);
  const [isTodo, setIsTodo] = useState(false);
  const [isAI, setIsAI] = useState(false);
  const [isSkill, setIsSkill] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [isShowUser, setIsShowUser] = useState(false);

  const handleProject = () => {
    resetHome();
    setIsProject((prev) => !prev);
    router.push("/project");
  }
  const handleChat = () => {
    resetHome();
    setIsChat((prev) => !prev);
    router.push("/chat");
  }
  const handleCalender = () => {
    resetHome();
    setIsCalender((prev) => !prev);
    router.push("/calender");
  }
  const handleTodo = () => {
    resetHome();
    setIsTodo((prev) => !prev);
    router.push("/todo");
  }
  const handleAI = () => {
    resetHome();
    setIsAI((prev) => !prev);
    router.push("/ai");
  }
  const handleSkill = () => {
    resetHome();
    setIsSkill((prev) => !prev);
    router.push("/skill");
  }
  const handleMember = () => {
    resetHome();
    setIsMember((prev) => !prev);
    router.push("/member");
  }
  const handleShowUser = () => setIsShowUser((prev) => !prev);

  const resetHome = () => {
    setIsProject(false);
    setIsChat(false);
    setIsCalender(false);
    setIsTodo(false);
    setIsAI(false);
    setIsSkill(false);
    setIsMember(false);
  }

  return (
    <NavContext.Provider value={{
      isProject,
      isChat,
      isCalender,
      isTodo,
      isAI,
      isSkill,
      isMember,
      isShowUser,
      handleProject,
      handleChat,
      handleCalender,
      handleTodo,
      handleAI,
      handleSkill,
      handleMember,
      handleShowUser
    }}
    >
      {children}
    </NavContext.Provider>
  )
}

export const useNavContext = () => {
  const context = useContext(NavContext);
  if(!context) throw new Error("not found context");
  return context;
}
