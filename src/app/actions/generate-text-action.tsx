"use server";
import connectDB from "@/lib/connectDB";
import { Text } from "../api/models/textSchema";

interface validatedFields {
  code: number;
}
export default async function generateText(validatedFields: validatedFields) {
  try {
    await connectDB();
    const res = await Text.find({ code: validatedFields.code });
    if (res) {
      return { success: true, data: res[0].data };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
