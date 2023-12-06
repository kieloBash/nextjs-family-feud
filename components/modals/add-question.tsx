"use client";
import React, { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnswerType } from "@/lib/interface/answer";
import { Plus, X } from "lucide-react";

const AddQuestionDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [currAnswer, setCurrAnswer] = useState("");
  const [currScore, setCurrScore] = useState<number | undefined>();

  async function handleSubmit() {
    if (answers.length === 0) return null;

    console.log(answers);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
          <DialogDescription>
            You can add a new question here, just input the answers and their
            corresponding scores.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-5 grid-flow-row">
          <div className="col-span-2 flex flex-col gap-1.5">
            <Label className="text-left mb-2">List of answers</Label>
            <div className="grid grid-cols-6 gap-2 font-medium">
              <Label className="col-span-4">Answer</Label>
              <Label className="col-span-2">Score</Label>
            </div>
            <div className="flex-1 flex flex-col justify-start gap-1 max-h-[10rem] overflow-y-auto">
              {answers.map((s, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-6 gap-2 border rounded-md px-2 py-2 relative hover:bg-red-100 cursor-pointer transition"
                    onClick={() => {
                      const arr = [...answers];
                      arr.splice(index, 1);
                      setAnswers(arr);
                    }}
                  >
                    <div className="col-span-4">{s.answer}</div>
                    <div className="col-span-2">{s.score}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-3 flex flex-col gap-2 pl-10">
            <Label className="text-left mb-2">Enter your new answers</Label>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="answer">Answer</Label>
              <Input
                value={currAnswer}
                onChange={(e) => setCurrAnswer(e.target.value)}
                type="text"
                id="answer"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="score">Score</Label>
              <Input
                value={currScore}
                onChange={(e) => setCurrScore(Number(e.target.value))}
                type="number"
                id="score"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Button
            onClick={() => {
              if (currAnswer && currScore) {
                if (currScore > 0) {
                  setAnswers((prev) => [
                    ...prev,
                    { answer: currAnswer, score: currScore },
                  ]);
                  setCurrAnswer("");
                  setCurrScore(0);
                }
              }
            }}
            type="button"
            variant={"ghost"}
            className="flex"
          >
            <Plus className="mr-2" /> <span className="">Add Answer</span>
          </Button>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionDialog;