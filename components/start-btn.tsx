"use client";
import React from "react";
import { Button } from "./ui/button";
import useFetchQuestions from "./hooks/getQuestions";
import { useSidebar } from "./contexts/SidebarProvider";
import Link from "next/link";

const StartButton = () => {
  const questions = useFetchQuestions();
  const { setActiveQuestion } = useSidebar();

  if (!questions.data || questions.data.length === 0) return null;

  const link = questions.data[0];

  return (
    <Link href={`/${link._id}`}>
      <Button
        onClick={() => setActiveQuestion(questions.data[0])}
        className="text-blue-500 bg-white uppercase text-6xl mt-8 px-4 py-2 w-[20rem] h-[5rem]"
      >
        Start
      </Button>
    </Link>
  );
};

export default StartButton;
