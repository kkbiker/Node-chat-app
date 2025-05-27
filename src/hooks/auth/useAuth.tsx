'use client';

import { useNavContext } from "@/context/Header/NavContext";
import axios from "axios";
import { useCallback, useState } from "react";

export const useAuth = () => {
  const { handleSkill } = useNavContext();

  const [isMaster, setIsMaster] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [isCompanyNameEmpty, setIsCompanyNameEmpty] = useState(false);
  const [isCompanyNameSize, setIsCompanyNameSize] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [isCompanyIdEmpty, setIsCompanyIdEmpty] = useState(false);
  const [name, setName] = useState("");
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isNameSize, setIsNameSize] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isPasswordSize, setIsPasswordSize] = useState(false);
  const [isPasswordPattern, setIsPasswordPattern] = useState(false);
  const [registErr, setRegistErr] = useState(false);
  const [loginErr, setLoginErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleCompanyName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsCompanyNameEmpty(!(value.trim().length > 0));
    setIsCompanyNameSize(value.trim().length > 50);
    setCompanyName(value);
  }, []);

  const handleCompanyId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsCompanyIdEmpty(!(value.trim().length > 0));
    setCompanyId(value);
  }, []);

  const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsNameEmpty(!(value.trim().length > 0));
    setIsNameSize(value.length > 20);
    setName(value);
  }, []);

  const handleEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsEmailEmpty(!(value.trim().length > 0));
    setEmail(e.target.value);
  }, []);

  const handlePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setIsPasswordEmpty(!(value.trim().length > 0));
    setIsPasswordSize(value.length > 50);
    setIsPasswordPattern(false);
    setPassword(e.target.value.trim());
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let haserror = false;

    if (isMaster) {
      if (companyName.trim() === "" || isCompanyNameSize) {
        setIsCompanyNameEmpty(companyName.trim() === "");
        haserror = true;
      }
    } else {
      if (companyId.trim() === "") {
        setIsCompanyIdEmpty(companyId.trim() === "");
        haserror = true;
      }
    }

    if (name.trim() === "" || email.trim() === "" || password.trim() === "" || isNameSize || isPasswordSize) {
      setIsNameEmpty(name.trim() === "");
      setIsEmailEmpty(email.trim() === "");
      setIsPasswordEmpty(password.trim() === "");
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]+$/;
      setIsPasswordPattern(regex.test(password));
      haserror = true;
    }

    if (haserror) return;

    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/register`, { companyName, companyId, name, email, password })
      .then(() => {
        handleSkill();
      })
      .catch(() => {
        setRegistErr(true);

        setTimeout(() => {
          setRegistErr(false);
        }, 3000);
      });
  }, [isMaster, companyName, isCompanyNameSize, companyId, name, isNameSize, email, password, isPasswordSize, handleSkill]);

  const handleLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/login`, { email, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        handleSkill();
      })
      .catch(() => {
        setLoginErr(true);

        setTimeout(() => {
          setLoginErr(false);
        }, 3000);
      });
  }, [email, password, handleSkill]);

  return {
    isMaster,
    setIsMaster,
    companyName,
    isCompanyNameEmpty,
    isCompanyNameSize,
    companyId,
    isCompanyIdEmpty,
    name,
    isNameEmpty,
    isNameSize,
    email,
    isEmailEmpty,
    password,
    isPasswordEmpty,
    isPasswordSize,
    isPasswordPattern,
    registErr,
    loginErr,
    showPassword,
    handleShow,
    handleCompanyName,
    handleCompanyId,
    handleName,
    handleEmail,
    setIsEmailEmpty,
    handlePassword,
    handleSubmit,
    handleLogin
  };
}
