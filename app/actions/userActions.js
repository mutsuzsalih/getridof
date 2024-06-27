"use server";
import { prisma } from "@/client";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  if (!email) {
    return { message: "Email  required!" };
  }
  if (!password) {
    return { message: "Password required!" };
  }
  if (!name) {
    return { message: "Name required!" };
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return { message: "User already exists!" };
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
    return { message: "Signup successful!" };
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong!" };
  }
}

export async function deleteAccount() {
  try {
    const session = await auth();
    if (!session) {
      return { message: "User not authenticated!" };
    }

    const user = await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });
    if (!user) {
      return { message: "User not found!" };
    }
    return { message: "Account deleted!" };
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong!" };
  }
}

export async function changePassword(prev, formData) {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const currentPassword = formData.get("currentPassword");
  if (!password || !confirmPassword || !currentPassword) {
    return { message: "All fields are required!" };
  }

  if (password !== confirmPassword) {
    return { message: "Passwords do not match!" };
  }

  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return { message: "User not found!" };
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!foundUser) {
      return { message: "User not found!" };
    }

    const isMatch = bcrypt.compareSync(currentPassword, foundUser.password);
    if (!isMatch) {
      return { message: "Current password is incorrect!" };
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: hash,
      },
    });
    return { message: "Password updated successfully!" };
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong!" };
  }
}
