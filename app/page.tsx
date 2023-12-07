import StartButton from "@/components/start-btn";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <main className="flex-1 p-10 px-16 flex bg-gradient-to-r from-blue-600 to-violet-600">
      <section
        className={`${anton.className} flex-1 flex justify-center items-center flex-col`}
      >
        <h1 className="font-black text-white lg:text-9xl  md:text-5xl text-6xl sm:text-4xl text-center">
          Family <br />
          <span className="bg-gradient-to-r from-amber-200 to-amber-300 bg-clip-text text-transparent">
            Feud
          </span>
        </h1>
        <StartButton />
      </section>
    </main>
  );
}
