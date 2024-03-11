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
export default function Page({ params }: { params: { username: string } }) {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userdata, setUserdata] = useState<any>();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase
        .from("authors")
        .select("*")
        .eq("username", params.username)
        .single();

      setUserdata(user);
    };

    const fetchStories = async () => {
      const { data: user } = await supabase
        .from("authors")
        .select("*")
        .eq("username", params.username)
        .single();

      const { data: storiesData } = await supabase
        .from("stories")
        .select("*")
        .eq("author_id", user?.author_id);

      setStories(storiesData || []);
      setLoading(false);
    };

    fetchStories();
    fetchUser();
  }, [params.username]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div
          style={{
            padding: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!userdata) {
    return (
      <div>
        <Navbar />
        
        <div className="flex justify-center items-center p-10">
          <p>No such username found.</p>
          <Link href="/feed">
          <Button>Go back to feed</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div
        style={{ padding: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
      >
        {/* Add user profile card */}
        <div className="flex justify-center items-center p-10">
          <ProfileCard user={userdata} />
        </div>
        {/* Add user stories */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {stories.map((story) => (
            <StoryCard
              key={story.story_id}
              story={story}
              authorName={params.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
