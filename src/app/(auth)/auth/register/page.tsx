"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { register, verifyEmail } from "@/services/authServices";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const verifySchema = z.object({
  verificationCode: z.string().length(8, "Verification code must be 8 digits"),
});

const Register = () => {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const verifyForm = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const onRegister = async (values: z.infer<typeof registerSchema>) => {
    try {
      const response = await register(values.username, values.email, values.password);
      setUserEmail(values.email);
      setIsRegistered(true);
      setOpenAlertDialog(true);
      registerForm.reset();
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message: string } } }).response?.data?.message || "An error occurred";
      registerForm.setError("email", { message: errorMessage });
    }
  };

  const onVerifyEmail = async (values: z.infer<typeof verifySchema>) => {
    try {
      const response = await verifyEmail(userEmail, values.verificationCode);
      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message: string } } }).response?.data?.message || "An error occurred";
      verifyForm.setError("verificationCode", { message: errorMessage });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-background text-foreground px-5">
      <div className="w-full max-w-md">
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegister)} className={`space-y-6 ${isRegistered ? 'hidden' : ''}`}>
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
            <h1 className="text-4xl font-bold text-center">Sign up now</h1>
            <p className="text-center text-muted-foreground mb-6">
              Please fill the details and create account
            </p>
            <FormField
              control={registerForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
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
              control={registerForm.control}
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
            <p className="text-sm text-muted-foreground">Password must be 8 characters</p>
            <Button type="submit" className="w-full bg-primary text-primary-foreground">
              Sign Up
            </Button>
          </form>
        </Form>

        {isRegistered && (
          <Form {...verifyForm}>
            <form onSubmit={verifyForm.handleSubmit(onVerifyEmail)} className="space-y-6">
              <h2 className="text-3xl font-bold text-center">OTP Verification</h2>
              <p className="text-center text-muted-foreground mb-6">
                Please check your email {userEmail} to see the verification code
              </p>
              <FormField
                control={verifyForm.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        maxLength={8}
                        className="flex justify-center"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                          <InputOTPSlot index={6} />
                          <InputOTPSlot index={7} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary text-primary-foreground">
                Verify Email
              </Button>
            </form>
          </Form>
        )}

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-secondary">
              Log in
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

        <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Check your email</AlertDialogTitle>
              <AlertDialogDescription>
                We have sent password recovery instructions to your email.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setOpenAlertDialog(false)}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Register;
