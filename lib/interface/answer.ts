export interface AnswerType {
  answer: string;
  score: number;
}
export interface QuestionType {
  _id: string;
  answers: AnswerType[];
}
