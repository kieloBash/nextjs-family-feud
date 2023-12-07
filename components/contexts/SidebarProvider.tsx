"use client";
import { QuestionType } from "@/lib/interface/answer";
import * as React from "react";

export type SidebarContextType = {
  toggle: boolean;
  setToggle: (temp: boolean) => void;
  activeQuestion: QuestionType | null;
  setActiveQuestion: (temp: QuestionType | null) => void;
};

export const SidebarContext = React.createContext<SidebarContextType>({
  toggle: false,
  setToggle: (index: boolean) => {},
  activeQuestion: null,
  setActiveQuestion: (index: QuestionType | null) => {},
});

export const useSidebar = () => React.useContext(SidebarContext);

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] =
    React.useState<QuestionType | null>(null);
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
