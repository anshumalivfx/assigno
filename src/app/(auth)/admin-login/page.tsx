"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { LoginFormValues, loginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

export default function Component() {
  const forms = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const onSignIn = async (values: LoginFormValues) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: values.username,
        password: values.password,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error as string,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] bg-[length:400%_400%] animate-gradient">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105">
        <h1 className="mb-6 text-3xl font-bold text-primary">Login</h1>
        <Form {...forms}>
          <form className="space-y-4" onSubmit={forms.handleSubmit(onSignIn)}>
            <div>
              <FormField
                control={forms.control}
                name="username"
                render={({ field }) => (
                  <>
                    <Label
                      htmlFor="username"
                      className="mb-2 block text-sm font-medium text-muted-foreground"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter admin username"
                      className="focus:ring-primary focus:border-primary transition-colors duration-300"
                      {...field}
                    />
                  </>
                )}
              />
            </div>
            <div>
              <FormField
                control={forms.control}
                name="password"
                render={({ field }) => (
                  <>
                    <div className="mb-2 flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-muted-foreground"
                      >
                        Password
                      </Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="focus:ring-primary focus:border-primary transition-colors duration-300"
                      {...field}
                    />
                  </>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-md bg-primary py-2 px-4 font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
