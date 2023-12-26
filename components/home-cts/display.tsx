"use client";
import React, { useEffect, useRef, useState } from "react";
import AnswerCard from "./card";

import { Anton } from "next/font/google";
import { QuestionType } from "@/lib/interface/answer";
import { useGame } from "../contexts/GameProvider";
import { Button } from "../ui/button";
import { Flag } from "lucide-react";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const Display = ({ data }: { data: QuestionType }) => {
  const { setTurn, handleScore, turn, handleResetMistake } = useGame();

  // AUDIO
  const incorrectRef = useRef<HTMLAudioElement | null>(null);
  const correctRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (incorrectRef.current) {
      incorrectRef.current.autoplay = false;
    }
    if (correctRef.current) {
      correctRef.current.autoplay = false;
    }
  }, []);
  function playCorrectSound() {
    if (correctRef.current) {
      correctRef.current.currentTime = 0; // Rewind to the beginning
      correctRef.current.play();
    }
  }
  function playIncorrectSound() {
    if (incorrectRef.current) {
      incorrectRef.current.currentTime = 0; // Rewind to the beginning
      incorrectRef.current.play();
    }
  }

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

  function finishGame() {
    setShownArr([true, true, true, true, true, true, true, true]);
  }

  return (
    <>
      <div className="hidden">
        <audio
          ref={incorrectRef}
          src={"/assets/sfx/incorrect.mp3"}
          autoPlay={false}
        />
        <audio
          ref={correctRef}
          src={"/assets/sfx/correct.mp3"}
          autoPlay={false}
        />
      </div>
      <div className="absolute top-4 right-4">
        <Button
          className="bg-yellow-500 text-black font-bold"
          onClick={finishGame}
          variant={"secondary"}
        >
          Finish Game <Flag className="ml-2"/>
        </Button>
      </div>
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
                        playCorrectSound();
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
                        playCorrectSound();
                      }
                    }}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Display;
