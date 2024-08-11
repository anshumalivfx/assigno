"use server";

import prisma from "@/lib/db";

export async function GET(req: Request) {
  try {
    const assignments = await prisma.assignment.findMany();
    if (assignments) {
      return Response.json(assignments, {
        status: 200,
      });
    } else {
      return Response.json(
        {
          message: "Failed to fetch assignments",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        message: "Failed to fetch assignments/ Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
