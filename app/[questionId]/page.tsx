import Display from "@/components/home-cts/display";
import React from "react";

const SingleQuestionPage = ({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <main className="flex-1 p-10 px-16 flex">
      <Display />
    </main>
  );
};

export default SingleQuestionPage;
