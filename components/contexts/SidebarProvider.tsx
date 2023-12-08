"use client";
import { QuestionType } from "@/lib/interface/answer";
import * as React from "react";

export type TurnType = "TurnA" | "TurnB" | null;

export type SidebarContextType = {
  toggle: boolean;
  setToggle: (temp: boolean) => void;
  activeQuestion: QuestionType | null;
  setActiveQuestion: (temp: QuestionType | null) => void;
  turn: TurnType;
  setTurn: (index: TurnType) => void;
};

export const SidebarContext = React.createContext<SidebarContextType>({
  toggle: false,
  setToggle: (index: boolean) => {},
  activeQuestion: null,
  setActiveQuestion: (index: QuestionType | null) => {},
  turn: null,
  setTurn: (index: TurnType) => {},
});

export const useSidebar = () => React.useContext(SidebarContext);

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [turn, setTurn] = React.useState<TurnType>(null);
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
        turn,
        setTurn,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
