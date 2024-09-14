"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail } from "lucide-react";
import { register as registerService } from "@/services/authService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

const registerSchema = z.object({
  username: z.string().min(1, "Le nom d'utilisateur est requis"),
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  birth_date: z.string().regex(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
    "La date de naissance doit être au format JJ/MM/AAAA"
  ),
});

const RegisterStep = ({
  onNext,
  onEmailCapture,
  onPasswordCapture, // Added prop to capture the password
}: {
  onNext: () => void;
  onEmailCapture: (email: string) => void;
  onPasswordCapture: (password: string) => void; // Prop to capture the password
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      birth_date: "",
    },
  });

  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await registerService(values);
      onEmailCapture(values.email);
      onPasswordCapture(values.password); // Capture the password
      setOpenDialog(true); // Open the dialog when registration is successful
    } catch (error) {
      registerForm.reset();
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    onNext(); // Proceed to the next step when the dialog is closed
  };

  return (
    <>
      <div className="flex flex-col">
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold text-center">
              Rejoignez notre communauté
            </h1>
            <p className="text-center text-muted-foreground mb-6">
              Remplissez les informations pour créer votre compte
            </p>

            <FormField
              control={registerForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <Input placeholder="Pseudonyme" {...field} className='text-[16px]' />
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
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input placeholder="Adresse email" {...field} className='text-[16px]' />
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
                      placeholder="JJ/MM/AAAA"
                      className='text-[16px]'
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
                        className='text-[16px]'
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
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
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
            >
              S'inscrire
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p>
            Vous avez un compte ?{" "}
            <Link href="/auth/login" className="text-secondary">
              Connectez vous
            </Link>
          </p>
        </div>
      </div>

      {/* Dialog to confirm email sent */}
      <Dialog open={openDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="flex flex-col items-center text-center gap-y-4">
          <DialogHeader className="flex flex-col justify-center items-center gap-y-2">
            <div className="bg-primary rounded-full p-4">
              <Mail className="text-white" size={24} />
            </div>
            <DialogTitle>Vérifiez vos emails</DialogTitle>
            <DialogDescription className="text-center">
              Nous avons envoyé les instructions de récupération à votre
              adresse email.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterStep;
