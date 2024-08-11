import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export default function Component() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] bg-[length:400%_400%] animate-gradient">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105">
        <h1 className="mb-6 text-3xl font-bold text-primary">Login</h1>
        <Form>
          <form className="space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-muted-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="focus:ring-primary focus:border-primary transition-colors duration-300"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline"
                  prefetch={false}
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="focus:ring-primary focus:border-primary transition-colors duration-300"
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
