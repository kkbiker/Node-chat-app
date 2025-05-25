import axios from "axios";
import { useAuth } from "@/hooks/auth/useAuth";
import { createContext, useCallback, useContext, useState } from "react";

type RegisterContext = {
  companyName: string,
  isCompanyNameEmpty: boolean,
  isCompanyNameSize: boolean,
  companyId: string,
  isCompanyIdEmpty: boolean,
  name: string,
  isNameEmpty: boolean,
  isNameSize: boolean,
  email: string,
  isEmailEmpty: boolean,
  mailsendErr: boolean,
  password: string,
  isPasswordEmpty: boolean,
  isPasswordSize: boolean,
  registErr: boolean,
  code: number,
  inputCode: string,
  isCodeEmpty: boolean,
  codeCheckErr: boolean,
  isMailsend: boolean,
  isCodeCheck: boolean,
  isSelectRegistType: boolean,
  isRegister: boolean,
  isMaster: boolean,
  handleCompanyName: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleCompanyId: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleName: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleMailsend: (e: React.FormEvent<HTMLFormElement>) => void,
  handleInputCode: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleCodeCheck: (e: React.FormEvent<HTMLFormElement>) => void,
  handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleMaster: () => void,
  handleUser: () => void,
}

const RegisterContext = createContext<RegisterContext | null>(null);

export const RegisterProvider = ({ children }: { children: React.ReactNode }) => {

  const { isMaster, setIsMaster, companyName, isCompanyNameEmpty, isCompanyNameSize, companyId, isCompanyIdEmpty, name, isNameEmpty, isNameSize, email, isEmailEmpty, password, isPasswordEmpty, isPasswordSize, registErr, handleCompanyName, handleCompanyId, handleName, handleEmail, setIsEmailEmpty, handlePassword, handleSubmit } = useAuth();

  const [code, setCode] = useState(0);
  const [inputCode, setInputCode] = useState("");
  const [isCodeEmpty, setIsCodeEmpty] = useState(false);
  const [codeCheckErr, setCodeCheckErr] = useState(false);
  const [isMailsend, setIsMailsend] = useState(true);
  const [mailsendErr, setMailsendErr] = useState(false);
  const [isCodeCheck, setIsCodeCheck] = useState(false);
  const [isSelectRegistType, setIsSelectRegistType] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleMailsend = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === "") {
      setIsEmailEmpty(email.trim() === "");
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/mailsend`, { email })
      .then((res) => {
        console.log(res.data.code);
        setCode(res.data.code);
        setIsMailsend(false);
        setIsCodeCheck(true);
      })
      .catch((err) => {
        console.error(err);
        setMailsendErr(true);

        setTimeout(() => {
          setMailsendErr(false);
        }, 3000);
      });
  }, [email]);

  const handleInputCode = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsCodeEmpty(!(value.trim().length > 0));
    setInputCode(value);
  }, []);

  const handleCodeCheck = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code !== parseInt(inputCode)) {
      setCodeCheckErr(true);
      return;
    } else {
      setIsCodeCheck(false);
      setIsSelectRegistType(true);
    }
  }, [code, inputCode]);

  const handleMaster = () => {
    setIsMaster(true);
    setIsSelectRegistType(false);
    setIsRegister(true);
  }

  const handleUser = () => {
    setIsSelectRegistType(false);
    setIsRegister(true);
  }

  return (
    <RegisterContext.Provider value={{
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
      mailsendErr,
      password,
      isPasswordEmpty,
      isPasswordSize,
      registErr,
      code,
      inputCode,
      isCodeEmpty,
      codeCheckErr,
      isMailsend,
      isCodeCheck,
      isSelectRegistType,
      isRegister,
      isMaster,
      handleCompanyName,
      handleCompanyId,
      handleName,
      handleEmail,
      handleMailsend,
      handleInputCode,
      handleCodeCheck,
      handlePassword,
      handleSubmit,
      handleMaster,
      handleUser
    }}>
      {children}
    </RegisterContext.Provider>
  );

}

export const useRegisterContext = () => {
  const context = useContext(RegisterContext);
  if (!context) throw new Error("not found context");
  return context;
}
