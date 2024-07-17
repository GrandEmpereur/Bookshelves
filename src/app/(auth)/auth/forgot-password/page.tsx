"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { forgotPassword, verifyResetToken, resetPassword } from "@/services/authentication";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const verifyResetSchema = z.object({
  verificationCode: z.string().length(8, "Verification code must be 8 digits"),
});

const ForgotPassword = () => {
  const router = useRouter();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const verifyResetForm = useForm<z.infer<typeof verifyResetSchema>>({
    resolver: zodResolver(verifyResetSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const onForgotPassword = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      const response = await forgotPassword(values.email);
      setIsEmailSent(true);
      setOpenAlertDialog(true);
      forgotPasswordForm.reset();
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message: string } } }).response?.data?.message || "An error occurred";
      forgotPasswordForm.setError("email", { message: errorMessage });
    }
  };

  const onVerifyResetToken = async (values: z.infer<typeof verifyResetSchema>) => {
    try {
      const response = await verifyResetToken(values.verificationCode);
      setUserId(response.userId);
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message: string } } }).response?.data?.message || "An error occurred";
      verifyResetForm.setError("verificationCode", { message: errorMessage });
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-background text-foreground px-5">
      <div className="w-full max-w-md">
        {!userId ? (
          <>
            <Form {...forgotPasswordForm}>
              <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPassword)} className={`space-y-6 ${isEmailSent ? 'hidden' : ''}`}>
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
                <h1 className="text-4xl font-bold text-center">Forgot Password</h1>
                <p className="text-center text-muted-foreground mb-6">
                  Enter your email to reset your password
                </p>
                <FormField
                  control={forgotPasswordForm.control}
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
                <Button type="submit" className="w-full bg-primary text-primary-foreground">
                  Send Reset Email
                </Button>
              </form>
            </Form>

            {isEmailSent && (
              <Form {...verifyResetForm}>
                <form onSubmit={verifyResetForm.handleSubmit(onVerifyResetToken)} className="space-y-6">
                  <h2 className="text-3xl font-bold text-center">OTP Verification</h2>
                  <p className="text-center text-muted-foreground mb-6">
                    Please check your email {forgotPasswordForm.getValues("email")} to see the verification code
                  </p>
                  <FormField
                    control={verifyResetForm.control}
                    name="verificationCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verification Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Verification Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary text-primary-foreground">
                    Verify Code
                  </Button>
                </form>
              </Form>
            )}
          </>
        ) : (
          <ResetPasswordForm userId={userId} />
        )}

        <div className="mt-6 text-center">
          <p>
            Remember your password?{" "}
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

export default ForgotPassword;

interface ResetPasswordFormProps {
  userId: string;
}

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const ResetPasswordForm = ({ userId }: ResetPasswordFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      const response = await resetPassword(userId, values.newPassword);
      // Redirect to login or display a success message
      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message: string } } }).response?.data
          ?.message || "An error occurred";
      form.setError("newPassword", { message: errorMessage });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Reset Password</h2>
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
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
        <p className="text-sm text-muted-foreground">Password must be at least 8 characters</p>
        <Button type="submit" className="w-full bg-primary text-primary-foreground">
          Reset Password
        </Button>
      </form>
    </Form>
  );
};
