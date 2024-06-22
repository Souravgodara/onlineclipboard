import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className='w-full bg-zinc-800'>
        <div className='flex gap-4 p-2 justify-end  mr-6'>
          <Link href={"/login"}>
            <Button>Log In</Button>
          </Link>

          <Button variant={"ghost"} className='text-white'>
            Sign Up
          </Button>
        </div>
      </nav>
    </>
  );
}
