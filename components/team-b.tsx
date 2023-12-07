"use client";
import React from "react";

import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const TeamB = () => {
  return (
    <div className="col-span-2 flex items-end w-full">
      <div className="h-[25rem] w-full border rounded-lg shadow-lg flex flex-col p-4 bg-white justify-center items-center">
        <h2
          className={`${anton.className} text-yellow-500 text-center text-4xl`}
        >
          Team B
        </h2>
        <div className="grid grid-cols-3 gap-2 w-full my-4">
          {Array(3)
            .fill([])
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-full border h-[10rem] rounded-md shadow-sm flex justify-center items-center text-8xl bg-red-600 text-white font-bold"
                >
                  X
                </div>
              );
            })}
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <span className="text-xl font-medium">Score</span>
          <p className="text-6xl font-black text-yellow-500">0</p>
        </div>
      </div>
    </div>
  );
};

export default TeamB;
