"use client";
import GenerateCode from "@/components/GenerateCode";
import GenerateText from "@/components/GenerateText";

export default function Home() {
  return (
    <>
      <h1 className='text-center text-white font-bold text-4xl p-4 '>
        Welcome to the Online Clipboard
      </h1>
      <main className='flex flex-col gap-10'>
        <GenerateCode />
        <GenerateText />
      </main>
    </>
  );
}
