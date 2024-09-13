"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  register as registerService,
  emailVerificationOtp,
  forgotPassword,
  resendVerificationEmail as resendVerificationEmailService,
} from "@/services/authService";

const registerSchema = z.object({
  username: z.string().min(1, "Le nom d'utilisateur est requis"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  birth_date: z.string().regex(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
    "La date de naissance doit être au format DD/MM/YYYY"
  ),
});

const verifySchema = z.object({
  verificationCode: z.string().length(6, "Le code de vérification doit contenir 6 chiffres"),
});

const Register = () => {
  const { user, isAuthenticated, registerUser } = useAuth();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      birth_date: "",
    },
  });

  const verifyForm = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/feed");
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const isValid = await registerForm.trigger();
      if (!isValid) return;

      // Inscription de l'utilisateur via le service d'authentification
      await registerService({
        username: values.username,
        email: values.email,
        password: values.password,
        birth_date: values.birth_date,
      });

      setUserEmail(values.email);
      setIsRegistered(true);
    } catch (error: unknown) {
      const errorMessage =
        (error as { message: string }).message || "Une erreur est survenue";
      setRegisterError(errorMessage);
      registerForm.reset();
    }
  };

  const onVerifySubmit = async (values: z.infer<typeof verifySchema>) => {
    try {
      // Vérification du code OTP via le service d'authentification
      console.log("values", userEmail, "values.verificationCode", values.verificationCode);
      await emailVerificationOtp(userEmail, values.verificationCode);
      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message: string } } }).response?.data
          ?.message || "Le code de vérification est incorrect ou a expiré.";
      setOtpError(errorMessage);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      setResendLoading(true);
      setResendCountdown(30);
      await resendVerificationEmailService(userEmail);
      alert("Le code de vérification a été renvoyé à votre email.");
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message: string } } }).response?.data
          ?.message || "Une erreur est survenue lors de l'envoi du code.";
      setOtpError(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-background text-foreground px-5">
      <div className="w-full max-w-md">
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
            className={`space-y-6 ${isRegistered ? "hidden" : ""}`}
          >
            <div className="flex justify-start mb-4">
              <Button variant="accentVariant" size="icon" className="rounded-full">
                <span className="sr-only">Retour</span>
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
            <h1 className="text-4xl font-bold text-center">Inscrivez-vous maintenant</h1>
            <p className="text-center text-muted-foreground mb-6">
              Veuillez remplir les détails pour créer un compte
            </p>
            {registerError && <p className="text-error text-center">{registerError}</p>}
            <FormField
              control={registerForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom d'utilisateur" {...field} />
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
              name="birth_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="DD/MM/YYYY"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
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
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-muted-foreground">
              Le mot de passe doit contenir au moins 8 caractères
            </p>
            <Button type="submit" className="w-full bg-primary text-primary-foreground">
              S'inscrire
            </Button>
          </form>
        </Form>

        {isRegistered && (
          <Form {...verifyForm}>
            <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Vérification OTP</h2>
              <p className="text-center text-muted-foreground mb-6">
                Veuillez vérifier votre email {userEmail} pour voir le code de vérification
              </p>
              {otpError && <p className="text-error text-center">{otpError}</p>}
              <FormField
                control={verifyForm.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code OTP</FormLabel>
                    <FormControl>
                      <InputOTP
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        maxLength={6}
                        className="flex justify-center"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary text-primary-foreground">
                Vérifier l'email
              </Button>
              <Button
                variant="secondary"
                className="w-full mt-4"
                onClick={resendVerificationEmail}
                disabled={resendLoading || resendCountdown > 0}
              >
                {resendCountdown > 0
                  ? `Renvoyer dans ${resendCountdown}s`
                  : "Renvoyer le code de vérification"}
              </Button>
            </form>
          </Form>
        )}

        <div className="mt-6 text-center">
          <p>
            Vous avez déjà un compte ?{" "}
            <Link href="/auth/login" className="text-secondary">
              Se connecter
            </Link>
          </p>
        </div>

        <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Vérifiez votre email</AlertDialogTitle>
              <AlertDialogDescription>
                Nous avons envoyé des instructions de récupération à votre email.
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
