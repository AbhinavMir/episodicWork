"use client";

import { supabase } from "@/utils/supabase/server";
import { useEffect, useState } from "react";
import StoryCard from "@/components/story-card";
import { Navbar } from "@/components/navbar";
import { LoadingSpinner } from "@/components/ui/spinner";
import Image from "next/image";
import { ProfileCard } from "@/components/profile-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page({ params }: { params: { storyurl: string } }) {

  return (

    
    <div>
      hey there, {params.storyurl}
    </div>
  );
}
