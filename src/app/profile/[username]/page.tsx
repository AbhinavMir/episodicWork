"use client";

import { supabase } from "@/utils/supabase/server";
import { useEffect, useState } from 'react';
import { StoryCard } from "@/components/story-card";

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
      <h1>Username: {params.username}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {stories.map((story) => (
          <div key={story.story_id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
            <h2>{story.title}</h2>
            <p>{story.description || 'No description available.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
