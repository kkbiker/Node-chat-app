'use client';

import { useCallback, useState } from "react";

export const useAuth = () => {
  const [name, setName] = useState("");

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  }

  const handleLogin = useCallback(() => {
    
  }, [name]);

  return {
    name,
    setName,
    handleSetName,
    handleLogin
  };  
}
