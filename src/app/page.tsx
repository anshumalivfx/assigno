"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  AssignmentFormValues,
  assignmentSchema,
} from "@/schemas/assignment-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "@/components/file-upload";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import { Loader } from "lucide-react";
import Header from "@/components/headers/Header";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const forms = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: "",
      fileUrl: "",
      name: "",
      email: "",
      discordUsername: "",
    },
  });

  const onSubmit = async (data: AssignmentFormValues) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/submit-assignment", {
        data,
      });
      if (response.status === 200) {
        toast({
          title: "Assignment submitted successfully",
          description: "Your assignment has been submitted",
        });
      } else {
        toast({
          title: "Failed to submit assignment",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to submit assignment",
        description: "Internal Server Error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
        <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Upload Assignment</h1>
              <p className="mt-2 text-muted-foreground">
                Submit your assignment by uploading a zip file and filling out
                the form below.
              </p>
            </div>
            <Form {...forms}>
              <form onSubmit={forms.handleSubmit(onSubmit)}>
                <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
                  <div className="flex h-40 items-center justify-center rounded-md border-2 border-dashed border-input bg-muted p-6 text-center">
                    {/* <div className="space-y-1 text-sm">
          <CloudUploadIcon className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="font-medium text-muted-foreground">
            Drag and drop your assignment zip file here
          </p>
          <p className="text-xs text-muted-foreground">
            or click to upload
          </p>
          <input type="file" className="sr-only" />
        </div> */}
                    <FormField
                      control={forms.control}
                      name="fileUrl"
                      render={({ field }) => (
                        <>
                          <FileUpload
                            endpoint="fileUploader"
                            onChange={field.onChange}
                          />
                        </>
                      )}
                    />
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={forms.control}
                      name="title"
                      render={({ field }) => (
                        <div>
                          <Label htmlFor="assignment-name">Assignment</Label>
                          <Input
                            id="assignment-name"
                            disabled={loading}
                            placeholder="Enter assignment name"
                            {...field}
                          />
                        </div>
                      )}
                    />
                    <FormField
                      control={forms.control}
                      name="name"
                      render={({ field }) => (
                        <div>
                          <Label htmlFor="student-name">Student Name</Label>
                          <Input
                            id="student-name"
                            disabled={loading}
                            placeholder="Enter your name"
                            {...field}
                          />
                        </div>
                      )}
                    />

                    <FormField
                      control={forms.control}
                      name="email"
                      render={({ field }) => (
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            disabled={loading}
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </div>
                      )}
                    />

                    <FormField
                      control={forms.control}
                      name="discordUsername"
                      render={({ field }) => (
                        <div>
                          <Label htmlFor="discord">Discord Username</Label>
                          <Input
                            id="discord"
                            disabled={loading}
                            placeholder="Enter your Discord username"
                            {...field}
                          />
                        </div>
                      )}
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button disabled={loading} type="submit">
                      {loading ? (
                        <Loader className="animate-spin w-8 h-8" />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
}
