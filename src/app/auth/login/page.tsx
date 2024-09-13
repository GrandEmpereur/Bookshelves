"use client";

import React, { useEffect, useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";

const formSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const { user, isAuthenticated, loginUser } = useAuth(); // Ajout de user et isAuthenticated
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Redirection automatique si l'utilisateur est déjà connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/feed");
    }
  }, [isAuthenticated, user, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Vérification des erreurs de validation du formulaire
      const isValid = await form.trigger();
      if (!isValid) return;

      // Tentative de connexion
      await loginUser(values.email, values.password);

      // Si l'utilisateur est connecté, redirection vers /feed
      if (isAuthenticated) {
        router.push("/feed");
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { message: string }).message || "Une erreur est survenue";
      setLoginError(errorMessage);
      form.reset(); // Réinitialise le formulaire si une erreur survient
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen text-foreground px-5 md:px-8 lg:px-12">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-8 lg:p-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              Se connecter
            </h1>
            <p className="text-center text-muted-foreground mb-6">
              Veuillez vous connecter pour continuer
            </p>
            {loginError && (
              <p className="text-error text-center">
                {loginError}
              </p>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="text-[16px] md:text-[16px] lg:text-[16px]"
                    />
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
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="text-[16px] md:text-[16px] lg:text-[16px]"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Se souvenir de moi</FormLabel>
                </FormItem>
              )}
            />
            <div className="flex justify-end mb-4">
              <Link href="/auth/forgot-password" className="text-secondary">
                Mot de passe oublié ?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 md:py-4 lg:py-5"
            >
              Se connecter
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center">
          <p>
            Vous n'avez pas de compte ?{" "}
            <Link href="/auth/register" className="text-secondary">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
