"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/server";
import { LoadingSpinner } from "@/components/ui/spinner";
import { ChapterCard } from "@/components/chapter-card";
import { Navbar } from "@/components/navbar";

interface Chapter {
  title: string;
  content: string;
  chapter_number: number;
}

export default function Page({ params }: { params: { storyurl: string } }) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getChapters() {}

    getChapters();
  }, [params.storyurl]);

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          chapters.map((chapter, index) => (
            <ChapterCard
              key={index}
              title={chapter.title}
              description={chapter.content}
              chapter={`Chapter ${chapter.chapter_number}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
