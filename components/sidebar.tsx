"use client";
import React from "react";
import { useSidebar } from "./contexts/SidebarProvider";
import { MenuIcon, X } from "lucide-react";

const SideBar = () => {
  const { toggle, setToggle } = useSidebar();

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
    <section className="h-full w-60 border-r p-2 fixed z-100 bg-white">
      <button
        type="button"
        onClick={() => {
          setToggle(!toggle);
        }}
        className="absolute flex justify-center items-center rounded-md top-4 right-2 w-10 h-10 p-1 transition hover:bg-slate-100"
      >
        <X />
      </button>
      SideBar
    </section>
  );
};

export default SideBar;
