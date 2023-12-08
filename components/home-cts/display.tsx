"use client";
import React, { useState } from "react";
import AnswerCard from "./card";

import { Anton } from "next/font/google";
import { QuestionType } from "@/lib/interface/answer";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const Display = ({ data }: { data: QuestionType }) => {
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

  return (
    <section className="col-span-4 flex flex-col justify-start items-center text-white">
      <div className="w-full h-40 flex justify-center items-center">
        <p
          className={`${anton.className} lg:text-5xl text-lg text-center font-medium`}
        >
          {data?.question}
        </p>
      </div>
      <div className="grid grid-cols-2 max-w-2xl w-full flex-1 shadow-lg gap-1">
        <div className="grid grid-rows-4 grid-cols-1 gap-1">
          {Array(4)
            .fill([0, 1, 2, 3])
            .map((arr, index) => {
              let blank = false;
              if (data.answers.length <= arr[index]) blank = true;

              return (
                <AnswerCard
                  key={index}
                  index={arr[index]}
                  blank={blank}
                  shown={shownArr[arr[index]]}
                  answer={data.answers[arr[index]]}
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
              if (data.answers.length <= arr[index]) blank = true;
              return (
                <AnswerCard
                  key={index}
                  index={arr[index]}
                  blank={blank}
                  shown={shownArr[arr[index]]}
                  answer={data.answers[arr[index]]}
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
