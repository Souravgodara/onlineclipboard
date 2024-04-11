"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import generateText from "@/app/actions/generate-text-action";
import { useToast } from "./ui/use-toast";

export default function GenerateText() {
  const [text, setText] = useState(null);
  const { toast } = useToast();
  async function getClipboard(formData: FormData) {
    const schema = z.object({
      code: z
        .number({
          required_error: "Code is required",
          invalid_type_error: "Invalid code",
        })
        .int()
        .min(1000, { message: "Code must be a 4-digit integer" })
        .max(9999, { message: "Code must be a 4-digit integer" }),
    });
    const validatedFields = schema.safeParse({
      code: parseInt(formData.get("code") as any),
    });

    if (!validatedFields.success) {
      toast({
        title: "Validation Failed",
        description: "Enter 4 Digits Valid Code",
        variant: "destructive",
      });
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const { success, data } = await generateText(validatedFields.data);
    if (success) {
      setText(data);
    } else {
      toast({
        title: "Code Invalid",
        description: "Please enter a valid code",
        variant: "destructive",
      });
    }
  }
  return (
    <main>
      <form action={async (formData) => await getClipboard(formData)}>
        <div className='flex flex-col gap-4 justify-center items-center mt-8'>
          <Input name='code' placeholder='Enter Generated Code Here' />
          <Button type='submit' className='w-fit'>
            Get Clipboard
          </Button>
        </div>
      </form>
      <div className='text-center text-white mt-4'>
        {text && <div>{text}</div>}
      </div>
    </main>
  );
}
