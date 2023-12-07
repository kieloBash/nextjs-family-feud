"use client";
import React, { useState } from "react";
import { useSidebar } from "./contexts/SidebarProvider";
import { Loader2, MenuIcon, Plus, X } from "lucide-react";
import AddQuestionDialog from "./modals/add-question";
import useFetchQuestions from "./hooks/getQuestions";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const SideBar = () => {
  const { toggle, setToggle, activeQuestion, setActiveQuestion } = useSidebar();
  const [openDialog, setOpenDialog] = useState(false);

  const questions = useFetchQuestions();

  if (!toggle)
    return (
      <button
        type="button"
        onClick={() => {
          setToggle(true);
        }}
        className="fixed flex justify-center items-center rounded-md top-4 left-2 w-10 h-10 p-1 transition hover:bg-slate-100"
      >
        <MenuIcon />
      </button>
    );

  return (
    <>
      <section className="h-full w-60 border-r p-4 fixed z-100 bg-white flex flex-col">
        {openDialog && (
          <AddQuestionDialog open={openDialog} setOpen={setOpenDialog} />
        )}
        <button
          type="button"
          onClick={() => {
            setToggle(false);
          }}
          className="absolute flex justify-center items-center rounded-md top-4 right-2 w-10 h-10 p-1 transition hover:bg-slate-100"
        >
          <X />
        </button>
        <h1 className="font-bold text-xl">Mercado Feud</h1>
        {questions.isLoading ? (
          <>
            <ul className="w-full mt-4 overflow-y-auto">
              {Array(5)
                .fill([])
                .map((_, index) => {
                  return (
                    <Skeleton
                      key={index}
                      className="w-full h-10 p-2 mt-2"
                    ></Skeleton>
                  );
                })}
            </ul>
            <li className="text-center flex justify-center items-center gap-2 mt-4">
              <span className="">Loading</span>
              <Loader2 className="w-5 h-5 animate-spin" />
            </li>
          </>
        ) : (
          <>
            <ul className="w-full mt-4 overflow-y-auto">
              <button
                type="button"
                onClick={() => {
                  setOpenDialog(true);
                }}
                className={`mb-2 flex justify-center items-center hover:bg-slate-100 text-center w-full p-2 rounded-md`}
              >
                <Plus className="mr-2 w-4 h-4" />
                <span className="">Add Question</span>
              </button>
              {questions?.data?.map((q, index) => {
                const isActive = activeQuestion && activeQuestion._id === q._id;
                const activeClass = isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-100";
                return (
                  <Link key={index} href={`/${q._id}`}>
                    <li>
                      <button
                        type="button"
                        disabled={isActive || false}
                        onClick={() => setActiveQuestion(q)}
                        className={`${activeClass} text-left w-full p-2 rounded-md`}
                      >
                        Question {index + 1}.
                      </button>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </>
        )}
      </section>
    </>
  );
};

export default SideBar;
