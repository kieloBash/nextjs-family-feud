"use client";
import React from "react";

import { Anton } from "next/font/google";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { useGame } from "./contexts/GameProvider";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const TeamAComponent = () => {
  const { turn, setTurn, teamA, handleMistake, handleResetMistake } = useGame();

  return (
    <div className="col-span-2 flex justify-end w-full flex-col">
      {turn !== "TurnA" && (
        <div className="flex mb-4">
          <Button variant={"secondary"} onClick={() => setTurn("TurnA")}>
            Switch turn <ChevronRight />
          </Button>
        </div>
      )}
      {teamA.getMistakes() === 3 && turn === "TurnA" && (
        <div className="flex mb-4">
          <Button variant={"secondary"} onClick={handleResetMistake}>
            Reset
          </Button>
        </div>
      )}
      <div
        className={`transition h-[25rem] w-full ${
          turn === "TurnA" && "border-yellow-400 shadow-yellow-200"
        } rounded-md shadow-lg flex flex-col p-4 border-[6px] bg-white justify-center items-center`}
      >
        <h2 className={`${anton.className} text-blue-500 text-center text-4xl`}>
          Team A
        </h2>
        <div className="grid grid-cols-3 gap-2 w-full my-4">
          {Array(3)
            .fill([])
            .map((_, index) => {
              const activeMistake = teamA.getMistakes() > index;
              return (
                <div
                  onClick={handleMistake}
                  key={index}
                  className={`${
                    activeMistake
                      ? "bg-red-600 text-8xl text-white"
                      : "bg-blue-600 text-lg text-center leading-4 text-yellow-200"
                  } w-full border-2 border-yellow-200 h-[10rem] rounded-md shadow-sm flex justify-center items-center cursor-pointer font-bold`}
                >
                  {activeMistake ? "X" : "Family Feud"}
                </div>
              );
            })}
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <span className="text-xl font-medium">Score</span>
          <p className="text-6xl font-black text-blue-500">
            {teamA.getScore()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamAComponent;
