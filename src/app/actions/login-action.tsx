"use server";

import { User } from "../api/models/userSchema";

export async function login(validatedFields: {
  email: string;
  password: string;
}) {
  try {
    const user = await User.findOne({ email: validatedFields.email });
    if (user) {
      console.log({ user });
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
