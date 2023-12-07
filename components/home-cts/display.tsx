"use client";
import React from "react";
import { useSidebar } from "../contexts/SidebarProvider";

const Display = () => {
  const { activeQuestion } = useSidebar();

  if (!activeQuestion)
    return (
      <section className="flex-1 flex justify-center items-center">
        <h1 className="font-black text-blue-600 lg:text-8xl sm:text-4xl text-center">
          Mercado <br /> Feud
        </h1>
      </section>
    );

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
