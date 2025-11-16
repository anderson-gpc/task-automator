"use client"

import React, { createContext, useState } from "react";

interface HomeContextProps {
  token: boolean;
  setToken: (value: boolean) => void;
}

export const HomeContext = createContext<HomeContextProps | undefined>(undefined);

export function HomeProvider({children}: {children: React.ReactNode}) {
  const [token, setToken] = useState<boolean>(false);

  return (
    <HomeContext value={{token, setToken}}>
      {children}
    </HomeContext>
  )
}
