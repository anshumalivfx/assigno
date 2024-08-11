import z from "zod";
// model Assignment {
//     id              String   @id @default(cuid())
//     title           String
//     fileUrl         String
//     name            String
//     email           String
//     discordUsername String
//     createdAt       DateTime @default(now())
//   }

export const assignmentSchema = z.object({
  title: z.string({ message: "Invalid title" }),
  fileUrl: z.string({ message: "Invalid fileUrl" }),
  name: z.string({ message: "Invalid name" }),
  email: z.string({ message: "Invalid email" }),
  discordUsername: z.string({ message: "Invalid discordUsername" }),
});

export type AssignmentFormValues = z.infer<typeof assignmentSchema>;
