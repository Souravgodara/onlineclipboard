"use client";
import GenerateCode from "@/components/GenerateCode";
import GenerateText from "@/components/GenerateText";

export default function Home() {
  return (
    <>
      <main className='flex flex-col gap-10'>
        <GenerateCode />
        <GenerateText />
      </main>
    </>
  );
}
