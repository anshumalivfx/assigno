"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Loader, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Assignment } from "@prisma/client";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function Component() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/fetch-assignments");
      if (response.status === 200) {
        setAssignments(response.data as Assignment[]);
        setLoading(false);
      } else {
        toast({
          title: "Failed to fetch assignments",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to fetch assignments",
        description: "Internal Server Error",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main
        className={`flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 ${
          loading && "justify-center items-center"
        }`}
      >
        {loading ? (
          <Loader className="w-[50px] h-[50px] animate-spin " />
        ) : (
          <div className="border shadow-sm rounded-lg p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Discord</TableHead>
                  <TableHead className="text-right">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <div className="font-medium">{assignment.title}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{assignment.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {assignment.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{assignment.email}</div>
                    </TableCell>
                    <TableCell>
                      <div>@{assignment.discordUsername}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          window.location.href = assignment.fileUrl;
                        }}
                      >
                        <DownloadIcon className="w-4 h-4" />
                        <span className="sr-only">Download assignment</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function Package2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
