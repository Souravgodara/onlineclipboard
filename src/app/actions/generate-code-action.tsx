"use server";
import connectDB from "@/lib/connectDB";
import { Text } from "../api/models/textSchema";
import { validatedFields } from "../types/common";

export default async function generateCode(validatedFields: validatedFields) {
  try {
    await connectDB();
    const res = await Text.create({
      data: validatedFields.text,
      code: validatedFields.code,
    });
    if (res) {
      return { success: true, data: res.code };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
