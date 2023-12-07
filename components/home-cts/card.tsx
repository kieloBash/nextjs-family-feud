"use client";
import { AnswerType } from "@/lib/interface/answer";
import React from "react";

const AnswerCard = ({
  answer,
  index,
  blank,
  shown,
  handleSetShown,
}: {
  answer: AnswerType;
  index: number;
  blank: boolean;
  shown: boolean;
  handleSetShown: (b: number) => void;
}) => {
  if (blank)
    return (
      <div className="bg-blue-600 p-2 rounded-md flex justify-center items-center border-4 border-black"></div>
    );

  return (
    <div
      onClick={() => handleSetShown(index)}
      className="cursor-pointer bg-blue-600 p-4 rounded-md flex justify-center items-center border-4 border-black"
    >
      {shown ? (
        <div className="w-full flex justify-between items-center text-2xl text-white font-bold">
          <h4 className="flex-1 flex flex-wrap">{answer.answer}</h4>
          <p className="">{answer.score}</p>
        </div>
      ) : (
        <>
          <span className="text-white w-10 h-10 text-center text-3xl border border-black font-black flex justify-center items-center bg-blue-800 rounded-full">
            {index + 1}
          </span>
        </>
      )}
    </div>
  );
};

export default AnswerCard;
