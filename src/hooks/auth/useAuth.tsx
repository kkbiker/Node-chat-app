'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const useAuth = () => {
  const router = useRouter();

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
  const [registErr, setRegistErr] = useState(false);
  const [loginErr, setLoginErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleShow = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleCompanyName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.trim().length > 0 ? setIsCompanyNameEmpty(false) : setIsCompanyNameEmpty(true);
    value.trim().length > 50 ? setIsCompanyNameSize(true) : setIsCompanyNameSize(false);
    setCompanyName(value);
  }, []);

  const handleCompanyId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.trim().length > 0 ? setIsCompanyIdEmpty(false) : setIsCompanyIdEmpty(true);
    setCompanyId(value);
  }, []);

  const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.trim().length > 0 ? setIsNameEmpty(false) : setIsNameEmpty(true);
    value.length > 20 ? setIsNameSize(true) : setIsNameSize(false);
    setName(value);
  }, []);

  const handleEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.trim().length > 0 ? setIsEmailEmpty(false) : setIsEmailEmpty(true);
    setEmail(e.target.value);
  }, []);

  const handlePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    value.trim().length > 0 ? setIsPasswordEmpty(false) : setIsPasswordEmpty(true);
    value.length > 50 ? setIsPasswordSize(true) : setIsPasswordSize(false);
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
      haserror = true;
    }

    if (haserror) return;

    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/register`, { companyName, companyId, name, email, password })
      .then(() => {
        router.push("/chat")
      })
      .catch(() => {
        setRegistErr(true);

        setTimeout(() => {
          setRegistErr(false);
        }, 3000);
      });
  }, [isMaster, companyName, isCompanyNameSize, companyId, name, isNameSize, email, password, isPasswordSize, router]);

  const handleLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/login`, { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/chat");
      })
      .catch(() => {
        setLoginErr(true);

        setTimeout(() => {
          setLoginErr(false);
        }, 3000);
      });
  }, [email, password, router]);

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
