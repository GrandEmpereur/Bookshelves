import { z } from "zod";

export const profileSchema = z.object({
    username: z.string().min(1, "Le nom d'utilisateur est requis"),
    email: z.string().email("Email invalide"),
    bio: z.string().optional(),
    profile_picture: z.string().url("URL de l'image invalide").optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;