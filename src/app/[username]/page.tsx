"use client";

import { supabase } from "@/utils/supabase/server";
import { useEffect, useState } from 'react';
import StoryCard from "@/components/story-card";
import { Navbar } from "@/components/navbar";

export default function Page({ params }: { params: { username: string } }) {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const { data: user } = await supabase
        .from('authors')
        .select('*')
        .eq('username', params.username)
        .single();

      const { data: storiesData } = await supabase
        .from('stories')
        .select('*')
        .eq('author_id', user?.author_id);

      setStories(storiesData || []);
    };

    fetchStories();
  }, [params.username]);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {stories.map((story) => (
          <StoryCard key={story.story_id} story={story} authorName={params.username} />
        ))}
      </div>
      </div>
    </div>
  );
}
