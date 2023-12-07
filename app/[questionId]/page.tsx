import Display from "@/components/home-cts/display";
import TeamA from "@/components/team-a";
import TeamB from "@/components/team-b";
import React from "react";
const SingleQuestionPage = ({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <main className="flex-1 p-10 px-16 bg-gradient-to-r from-blue-600 to-violet-600 grid grid-cols-8 gap-8">
      <TeamA />
      <Display />
      <TeamB />
    </main>
  );
};

export default SingleQuestionPage;
