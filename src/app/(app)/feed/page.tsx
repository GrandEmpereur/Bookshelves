"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrentUser } from "@/services/authService";

const FeedPage: React.FC = () => {
  const [user, setUser] = useState<any | null>(null); // État pour stocker les informations de l'utilisateur
  const [loading, setLoading] = useState<boolean>(true); // État pour gérer le chargement

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await CurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  console.log(user);

  if (loading) {
    // Affiche les Skeletons si les données sont en cours de chargement
    return (
      <div className="flex flex-col gap-6 px-4">
        <Skeleton className="w-full h-10 mb-4 rounded" />
        <Skeleton className="w-full h-6 mb-2 rounded" />
        <Skeleton className="w-full h-40 mb-4 rounded" />
        <Skeleton className="w-full h-10 mb-4 rounded" />
      </div>
    );
  }

  if (!user) {
    // Affichage si l'utilisateur n'est pas connecté ou s'il y a une erreur
    return <p>Impossible de récupérer les informations de l'utilisateur. Veuillez vous reconnecter.</p>;
  }

  return (
    <div className="flex flex-col gap-6 px-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Bienvenue, {user.data.username}!</h1>
        <p className="mb-2">Email : {user.data.email}</p>
        <p className="mb-4">Date de naissance : {user.data.birthDate}</p>
        {/* Ajoutez d'autres informations de l'utilisateur ici */}
      </div>
    </div>
  );
};

export default FeedPage;
