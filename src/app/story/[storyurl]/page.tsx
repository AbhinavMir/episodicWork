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

interface Chapter {
  title: string;
  content: string;
  chapter_number: number;
}

export default function Page({ params }: { params: { storyurl: string } }) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getChapters() {
      try {
        const { data, error } = await supabase
          .from('stories')
          .select(`
            chapters (
              title,
              content,
              chapter_number
            )
          `)
          .eq('storyurl', params.storyurl)
          .single();

        if (error) throw error;
        if (data && data.chapters) {
          setChapters(data.chapters);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getChapters();
  }, [params.storyurl]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        chapters.map((chapter, index) => (
          <div key={index}>
            <h2>{chapter.title}</h2>
            <p>{chapter.content}</p>
            <p>Chapter: {chapter.chapter_number}</p>
          </div>
        ))
      )}
    </div>
  );
}
