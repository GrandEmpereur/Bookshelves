"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

// Ajoute le schéma pour la date de naissance
const registerSchema = z.object({
  username: z.string().min(1, "Le nom d'utilisateur est requis"),
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  birth_date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "La date de naissance doit être au format YYYY-MM-DD"
  ),
});

const verifySchema = z.object({
  verificationCode: z.string().length(8, "Le code de vérification doit contenir 8 chiffres"),
});

const Register = () => {
  const { user, isAuthenticated, registerUser } = useAuth();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [registerError, setRegisterError] = useState<string | null>(null);

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

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const isValid = await registerForm.trigger();
      if (!isValid) return;

      await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
        birth_date: values.birth_date,
      });
      setUserEmail(values.email);
      setIsRegistered(true);
    } catch (error: unknown) {
      const errorMessage = (error as { message: string }).message || "Une erreur est survenue";
      setRegisterError(errorMessage);
      registerForm.reset();
    }
  };

  const onVerifySubmit = async (values: z.infer<typeof verifySchema>) => {
    // Ajouter ici la logique pour vérifier le code OTP, selon la configuration de ton backend
    router.push("/feed");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-background text-foreground px-5">
      <div className="w-full max-w-md">
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className={`space-y-6 ${isRegistered ? 'hidden' : ''}`}>
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
            {registerError && (
              <p className="text-error text-center">
                {registerError}
              </p>
            )}
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
                      placeholder="YYYY-MM-DD"
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
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-sm text-muted-foreground">Le mot de passe doit contenir au moins 8 caractères</p>
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
                Vérifier l'email
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
