"use client";
import React, { useEffect, useState } from "react";
import AnswerCard from "./card";

import { Anton } from "next/font/google";
import { QuestionType } from "@/lib/interface/answer";
import { useGame } from "../contexts/GameProvider";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const Display = ({ data }: { data: QuestionType }) => {
  const { setTurn, handleScore, turn, handleResetMistake } = useGame();

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

  useEffect(() => {
    setTurn(null);
    handleResetMistake();
  }, []);

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
                    if (turn !== null) {
                      const temp = [...shownArr];
                      temp[b] = true;
                      setShownArr(temp);
                      handleScore(data.answers[arr[index]].score);
                    }
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
                    if (turn !== null) {
                      const temp = [...shownArr];
                      temp[b] = true;
                      setShownArr(temp);
                      handleScore(data.answers[arr[index]].score);
                    }
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
