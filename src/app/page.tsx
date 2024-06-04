'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <div>
        <h2>Go to login page</h2>
        <Button onClick={() => router.push("/auth/login")}>Login</Button>
      </div>
    </div>
  );
}
