'use client';

import { RegisterProvider, useRegisterContext } from "@/context/Register/RegisterContext";
import { Mailsend } from "@/component/register/mailsend/mailsend";
import { CodeCheck } from "@/component/register/codeCheck/codeCheck";
import { SelectRegistType } from "@/component/register/selectRegistType/selectRegistType";
import { Register } from "@/component/register/register/register";

function RegisterContext() {
  const { isMailsend, isCodeCheck, isSelectRegistType, isRegister } = useRegisterContext();

  return (
    <>
      {isMailsend && <Mailsend />}
      {isCodeCheck && <CodeCheck />}
      {isSelectRegistType && <SelectRegistType />}
      {isRegister && <Register />}
    </>
  );
}

export default function Registers() {
  return (
    <>
      <RegisterProvider>
        <RegisterContext />
      </RegisterProvider>
    </>
  );
}
