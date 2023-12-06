"use client";
import React from "react";
import { useSidebar } from "../contexts/SidebarProvider";

const Display = () => {
  const { activeQuestion } = useSidebar();
  return (
    <div>
      {activeQuestion?.answers.map((a, index) => {
        return (
          <li className="" key={index}>
            {a.answer} | {a.score.toLocaleString()}
          </li>
        );
      })}
    </div>
  );
};

export default Display;
