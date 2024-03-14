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


const fetchStoryIdFromUrl = async (storyUrl: string): Promise<number | null> => {
  let { data, error } = await supabase
    .from('stories')
    .select('story_id')
    .eq('storyurl', storyUrl)
    .single()

  console.log(data);
  console.log(error);
  if (error) throw new Error(error.message)
  return data ? data.story_id : null
}

const fetchChaptersByStoryId = async (storyId: number): Promise<any[]> => {
  let { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('story_id', storyId)

  if (error) throw new Error(error.message)
  return data as any[]; // Add type assertion here
}



export default function Page({ params }: { params: { storyurl: string } }) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getChapters() {
      const storyId = await fetchStoryIdFromUrl(params.storyurl);
      console.log(storyId);
      if (!storyId) {
        setLoading(false);
        return;
      }
      const chapters = await fetchChaptersByStoryId(storyId);
      setChapters(chapters);
      setLoading(false);
    }

    getChapters();
  }, [params.storyurl]);

  console.log(chapters);
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', gap: '20px' }}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '800px', gap: '20px' }}>
            {chapters.map((chapter, index) => (
              <ChapterCard
                key={index}
                title={chapter.title}
                description={chapter.content}
                chapter={`Chapter ${chapter.chapter_number}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>

  );
}
