"use client";
import { login } from "@/app/actions/login-action";
import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";

function page() {
  const handleLogin = async (formData: FormData) => {
    const schema = z.object({
      email: z
        .string({
          invalid_type_error: "Invalid text",
        })
        .email()
        .max(40),
      password: z
        .string({
          invalid_type_error: "Invalid code",
        })
        .min(8)
        .max(20),
    });
    const validatedFields = schema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (!validatedFields.success) {
      console.log(validatedFields.error.message);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const { success } = await login(validatedFields.data);
    if (success) {
      console.log("User logged in successfully");
    }
  };

  return (
    <>
      <div>
        <h1 className='text-3xl text-white font-bold text-center mt-4'>
          Login to continue
        </h1>
        <div>
          <form
            action={handleLogin}
            className='flex flex-col justify-center items-center gap-4 mt-10'>
            <input
              className='p-2 rounded-md'
              placeholder='Email'
              type='email'
              name='email'
            />
            <input
              className='p-2 rounded-md'
              placeholder='Password'
              type='password'
              name='password'
            />
            <Button type='submit'>Log In</Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
