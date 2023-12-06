"use client";
import React, { useState } from "react";
import { useSidebar } from "./contexts/SidebarProvider";
import { MenuIcon, Plus, X } from "lucide-react";
import AddQuestionDialog from "./modals/add-question";

const SideBar = () => {
  const { toggle, setToggle, activeQuestion, setActiveQuestion } = useSidebar();
  const [openDialog, setOpenDialog] = useState(false);

  if (!toggle)
    return (
      <button
        type="button"
        onClick={() => {
          setToggle(!toggle);
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
            setToggle(!toggle);
          }}
          className="absolute flex justify-center items-center rounded-md top-4 right-2 w-10 h-10 p-1 transition hover:bg-slate-100"
        >
          <X />
        </button>
        <h1 className="font-bold text-xl">Mercado Feud</h1>
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
          {Array(20)
            .fill([])
            .map((_, index) => {
              const isActive = activeQuestion === index;
              const activeClass = isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-100";
              return (
                <li key={index}>
                  <button
                    type="button"
                    disabled={isActive}
                    onClick={() => setActiveQuestion(index)}
                    className={`${activeClass} text-left w-full p-2 rounded-md`}
                  >
                    Question {index + 1}.
                  </button>
                </li>
              );
            })}
        </ul>
      </section>
    </>
  );
};

export default SideBar;
