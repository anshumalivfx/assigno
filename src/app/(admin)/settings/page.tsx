"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  ChangePasswordFormValues,
  changePasswordSchema,
} from "@/schemas/change-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { EyeOffIcon, Loader } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { useToast } from "@/components/ui/use-toast";

export default function Component() {
  const [viewOldPassword, setViewOldPassword] = useState(false);
  const [viewNewPassword, setViewNewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const { data: session } = useSession();
  const user = session?.user as User;

  const forms = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const changePassword = async (data: ChangePasswordFormValues) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/change-password", {
        id: user._id,
        data: data,
      });
      if (response.status === 200) {
        forms.reset();
        forms.clearErrors();
        toast({
          title: "Password updated successfully",
          description: "Your password has been updated",
        });
      } else {
        toast({
          title: "Failed to update password",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to update password",
        description: "Internal Server Error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="`flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 justify-center items-center">
      <Card className="mx-auto max-w-md animate-fade-in">
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(changePassword)}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Change Password
              </CardTitle>
              <CardDescription>
                Enter your current password and a new password to update your
                account security.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={forms.control}
                name="oldPassword"
                render={({ field }) => (
                  <div>
                    <div className="relative space-y-2">
                      <Label htmlFor="oldPassword">Current Password</Label>
                      <Input
                        id="oldPassword"
                        type={viewOldPassword ? "text" : "password"}
                        placeholder="Enter your current password"
                        {...field}
                        required
                        disabled={loading}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="absolute bottom-1 right-1 h-7 w-7 animate-fade-in"
                        onClick={() =>
                          setViewOldPassword((prev: boolean) => !prev)
                        }
                      >
                        {!viewOldPassword ? (
                          <EyeIcon className="h-4 w-4" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          Toggle password visibility
                        </span>
                      </Button>
                    </div>
                    <FormMessage />
                  </div>
                )}
              />

              <FormField
                control={forms.control}
                name="newPassword"
                render={({ field }) => (
                  <div>
                    <div className="relative space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type={viewNewPassword ? "text" : "password"}
                        placeholder="Enter a new password"
                        required
                        disabled={loading}
                        {...field}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="absolute bottom-1 right-1 h-7 w-7 animate-fade-in"
                        onClick={() =>
                          setViewNewPassword((prev: boolean) => !prev)
                        }
                      >
                        {!viewNewPassword ? (
                          <EyeIcon className="h-4 w-4" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          Toggle password visibility
                        </span>
                      </Button>
                    </div>
                    <FormMessage />
                  </div>
                )}
              />

              <FormField
                control={forms.control}
                name="confirmPassword"
                render={({ field }) => (
                  <div className="relative space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type={viewConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      required
                      disabled={loading}
                      {...field}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      className="absolute bottom-1 right-1 h-7 w-7 animate-fade-in"
                      onClick={() =>
                        setViewConfirmPassword((prev: boolean) => !prev)
                      }
                    >
                      {!viewConfirmPassword ? (
                        <EyeIcon className="h-4 w-4" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                    <FormMessage />
                  </div>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button disabled={loading} type="submit" className="ml-auto">
                {loading ? (
                  <Loader className="w-8 h-8 animate-spin" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

function EyeIcon(props: any) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
