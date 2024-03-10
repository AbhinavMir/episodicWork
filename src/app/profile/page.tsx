"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/server";
import { Profile } from "@/components/profile";
import { Navbar } from "@/components/navbar";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/auth");
    });
  }, [router]);

  return (
    <div>
      <Navbar />
      <Profile />
    </div>
  );
}
