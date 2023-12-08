import React from "react";

// UI
import Display from "@/components/home-cts/display";
import TeamA from "@/components/team-a";
import TeamB from "@/components/team-b";

// DB
import Question from "@/lib/models/question.model";
import connectDB from "@/lib/mongodb";
import { QuestionType } from "@/lib/interface/answer";

async function fetchSingleQuestion(_id: string) {
  try {
    connectDB();

    const created: any = await Question.findById(_id)
      .lean()
      .select("_id answers question")
      .exec();

    if (!created)
      return {
        message: "Errer fetching Question",
        success: false,
      };

    return {
      message: "Successfully fetch Question",
      success: true,
      data: { ...created, _id: created._id.toString() },
    };
  } catch (error: any) {
    throw new Error(`Error fetch question: ${error.message}`);
  }
}

const SingleQuestionPage = async ({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { questionId } = params;
  const single = await fetchSingleQuestion(questionId as string);

  if (!single.success) return null;

  return (
    <main className="flex-1 p-10 px-16 bg-gradient-to-r from-blue-600 to-violet-600 grid grid-cols-8 gap-8">
      <TeamA />
      <Display data={single.data as QuestionType} />
      <TeamB />
    </main>
  );
};

export default SingleQuestionPage;
