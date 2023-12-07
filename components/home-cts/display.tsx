"use client";
import React, { useState } from "react";
import { useSidebar } from "../contexts/SidebarProvider";
import AnswerCard from "./card";

const Display = () => {
  const { activeQuestion } = useSidebar();

  const [shownArr, setShownArr] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  if (!activeQuestion)
    return (
      <section className="flex-1 flex justify-center items-center">
        <h1 className="font-black text-blue-600 lg:text-8xl sm:text-4xl text-center">
          Mercado <br /> Feud
        </h1>
      </section>
    );

  return (
    <section className="flex-1 flex flex-col justify-start items-center">
      <div className="w-full h-40 flex justify-center items-center">
        <p className="text-4xl text-center font-medium">
          {activeQuestion?.question}
        </p>
      </div>
      <div className="grid grid-cols-2 max-w-2xl w-full flex-1 shadow-lg gap-1">
        <div className="grid grid-rows-4 grid-cols-1 gap-1">
          {Array(4)
            .fill([0, 1, 2, 3])
            .map((arr, index) => {
              let blank = false;
              if (activeQuestion.answers.length <= arr[index]) blank = true;

              return (
                <AnswerCard
                  key={index}
                  index={arr[index]}
                  blank={blank}
                  shown={shownArr[arr[index]]}
                  answer={activeQuestion.answers[arr[index]]}
                  handleSetShown={(b: number) => {
                    const arr = [...shownArr];
                    arr[b] = true;
                    setShownArr(arr);
                  }}
                />
              );
            })}
        </div>
        <div className="grid grid-rows-4 grid-cols-1 gap-1">
          {Array(4)
            .fill([4, 5, 6, 7])
            .map((arr, index) => {
              let blank = false;
              if (activeQuestion.answers.length <= arr[index]) blank = true;
              return (
                <AnswerCard
                  key={index}
                  index={arr[index]}
                  blank={blank}
                  shown={shownArr[arr[index]]}
                  answer={activeQuestion.answers[arr[index]]}
                  handleSetShown={(b: number) => {
                    const arr = [...shownArr];
                    arr[b] = true;
                    setShownArr(arr);
                  }}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Display;
