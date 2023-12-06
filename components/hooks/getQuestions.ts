"use client";

import { fetchQuestions } from "@/lib/actions/question.action";
import { QuestionType } from "@/lib/interface/answer";
import { useQuery } from "@tanstack/react-query";

const useFetchQuestions = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`questions`],
    queryFn: async () => {
      const { questions } = await fetchQuestions();
      return questions;
    },
    // refetchInterval: 60000,
  });
  const questions = data as QuestionType[];
  return { data: questions, isLoading };
};

export default useFetchQuestions;
