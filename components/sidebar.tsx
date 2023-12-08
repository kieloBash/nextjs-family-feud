"use client";
import React, { useState } from "react";
import { useSidebar } from "./contexts/SidebarProvider";
import { Loader2, MenuIcon, Plus, Trash, X } from "lucide-react";
import AddQuestionDialog from "./modals/add-question";
import useFetchQuestions from "./hooks/getQuestions";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { deleteQuestion } from "@/lib/actions/question.action";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const SideBar = () => {
  const { toggle, setToggle, activeQuestion, setActiveQuestion } = useSidebar();
  const [openDialog, setOpenDialog] = useState(false);

  const questions = useFetchQuestions();
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleDelete(_id: string) {
    const res = await deleteQuestion({ _id });

    if (res.success) {
      queryClient.invalidateQueries({
        queryKey: [`questions`],
      });
      if (_id === activeQuestion?._id) {
        setActiveQuestion(null);
        router.replace("/");
      }
    }
  }

  if (!toggle)
    return (
      <button
        type="button"
        onClick={() => {
          setToggle(true);
        }}
        className="fixed flex justify-center items-center rounded-md top-4 left-2 w-10 h-10 p-1 transition"
      >
        <MenuIcon className="w-full h-full text-white hover:text-slate-200 transition" />
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
        <Link href={"/"} onClick={() => setActiveQuestion(null)}>
          <h1 className="font-bold text-xl">Mercado Feud</h1>
        </Link>
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
                  <div
                    key={index}
                    className={`${activeClass} text-left w-full rounded-md flex justify-between items-center`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        router;
                        setActiveQuestion(q);
                        router.push(`/${q._id}`);
                      }}
                      className="flex-1 p-2 text-left"
                    >
                      <span>Question {index + 1}.</span>
                    </button>
                    <Button
                      type="button"
                      variant={"ghost"}
                      className="w-6 h-6 p-1 rounded-full"
                      onClick={() => handleDelete(q._id)}
                    >
                      <Trash className="w-full h-full" />
                    </Button>
                  </div>
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
