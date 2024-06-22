"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useState } from "react";
import generateCode from "@/app/actions/generate-code-action";
import Loading from "./loading";

export default function GenerateCode() {
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  async function getCode(formData: FormData) {
    const schema = z.object({
      text: z.string({
        invalid_type_error: "Invalid text",
      }),
      code: z.number({
        invalid_type_error: "Invalid code",
      }),
    });
    const validatedFields = schema.safeParse({
      text: formData.get("text"),
      code: Math.floor(Math.random() * 9000) + 1000,
    });
    if (!validatedFields.success) {
      console.log(validatedFields.error.message);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const { success, data } = await generateCode(validatedFields.data);
    if (success) {
      setLoading(false);
      setCode(data);
    }
  }
  return (
    <main>
      <form action={async (formData) => await getCode(formData)}>
        <div className='flex flex-col gap-4 justify-center items-center mt-8'>
          <Textarea name='text' placeholder='Enter Text Here...' />
          <Button
            onClick={() => setLoading(true)}
            type='submit'
            className='w-fit'>
            Copy to Online Clipboard
          </Button>
        </div>
      </form>
      <div className='text-center text-white mt-4'>
        {loading && <Loading />}
        {code && <div>{code}</div>}
      </div>
    </main>
  );
}
