"use server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  const { id, data } = await req.json();
  try {
    const user = await prisma.admin.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      return Response.json(
        {
          message: "No user found with this id",
        },
        {
          status: 404,
        }
      );
    }
    const isPasswordCorrect = await comparePassword(
      data.oldPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return Response.json(
        {
          message: "Incorrect password",
        },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    await prisma.admin.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return Response.json(
      {
        message: "Password updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch {}
}

async function comparePassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
