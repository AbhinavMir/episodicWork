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
          const sortedChapters = data.chapters.sort((a, b) => a.chapter_number - b.chapter_number);
          setChapters(sortedChapters);
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
      <Navbar />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
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
