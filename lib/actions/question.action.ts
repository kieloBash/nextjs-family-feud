"use server";

import { AnswerType, QuestionType } from "../interface/answer";
import Question from "../models/question.model";
import connectDB from "../mongodb";

export async function fetchQuestions() {
  try {
    connectDB();

    // Fetch users with pagination
    const query = Question.find({})
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id answers question")
      .exec();

    const totalCount = await Question.countDocuments({});
    const data = await query;

    const plainData: QuestionType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        answers: d.answers.map((s: any) => {
          return {
            ...s,
            _id: s._id?.toString(),
          };
        }),
      };
    });

    return { questions: plainData, totalCount };
  } catch (error: any) {
    throw new Error("Error in fetching users", error.message);
  }
}

export async function createNewQuestion({
  answers,
  question,
}: {
  answers: AnswerType[];
  question: string;
}) {
  try {
    connectDB();

    console.log(answers);
    const created = await Question.create({
      answers,
      question,
    });

    console.log(created);

    return {
      message: "Successfully Created New Question",
      success: true,
    };
  } catch (error: any) {
    throw new Error(`Error creating new question: ${error.message}`);
  }
}
