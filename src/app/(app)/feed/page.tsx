"use client";

import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CurrentUser } from "@/services/authService";
import { logout } from "@/services/authService";
import { Button } from "@/components/ui/button";
import Feed from "@components/client/post/Feed";

const FeedPage: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  if (loading) {
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
    return <p>Impossible de récupérer les informations de l'utilisateur. Veuillez vous reconnecter.</p>;
  }

  return (
    <div className="flex flex-col gap-y-6 ">
      {Array.from({ length: 10 }).map((_, index) => (
        <Feed key={index} /> 
      ))}
    </div>
  );
};

export default FeedPage;
