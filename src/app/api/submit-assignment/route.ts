"use server";
import prisma from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const { data } = await req.json();
  try {
    const assignment = await prisma.assignment.create({
      data: {
        id: randomUUID(),
        ...data,
      },
    });
    if (assignment) {
      return Response.json(assignment, {
        status: 200,
      });
    } else {
      return Response.json(
        {
          message: "Failed to submit assignment",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        message: "Failed to submit assignment/ Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
