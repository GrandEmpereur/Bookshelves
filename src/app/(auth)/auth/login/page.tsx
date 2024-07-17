"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/services/authentication";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await login(values.email, values.password);
      localStorage.setItem("token", response.token);
      router.push("/feed");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message: string } } }).response?.data
          ?.message || "An error occurred";
      form.setError("email", { message: errorMessage });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-background text-foreground px-5">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-start mb-4">
              <Button variant="accentVariant" size="icon" className="rounded-full">
                <span className="sr-only">Back</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Button>
            </div>
            <h1 className="text-4xl font-bold text-center">Sign in</h1>
            <p className="text-center text-muted-foreground mb-6">
              Please sign in to continue our app
            </p>
            {form.formState.errors.email && (
              <p className="text-error text-center">
                {form.formState.errors.email.message}
              </p>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end mb-4">
              <Link href="/forgot-password" className="text-secondary">
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground">
              Sign In
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center">
          <p>
            Don’t have an account?{" "}
            <Link href="/auth/register" className="text-secondary">
              Sign up
            </Link>
          </p>
          <p className="mt-4">Or connect</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Button variant="secondary" className="p-2">
              <FaFacebook className="w-6 h-6 text-white" />
            </Button>
            <Button variant="secondary" className="p-2">
              <FaGoogle className="w-6 h-6 text-white" />
            </Button>
            <Button variant="secondary" className="p-2">
              <FaTwitter className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
