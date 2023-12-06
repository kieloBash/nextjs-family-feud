"use client";
import * as React from "react";

export type SidebarContextType = {
  toggle: boolean;
  setToggle: (temp: boolean) => void;
  activeQuestion: number;
  setActiveQuestion: (temp: number) => void;
};

export const SidebarContext = React.createContext<SidebarContextType>({
  toggle: false,
  setToggle: (index: boolean) => {},
  activeQuestion: 0,
  setActiveQuestion: (index: number) => {},
});

export const useSidebar = () => React.useContext(SidebarContext);

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = React.useState<number>(0);
  return (
    <SidebarContext.Provider
      value={{
        toggle,
        setToggle,
        activeQuestion,
        setActiveQuestion,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
