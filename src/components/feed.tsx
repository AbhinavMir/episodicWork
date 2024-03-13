"use client";
import Link from "next/link"
import { JSX, SVGProps } from "react"
import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase/server";

export function Feed() {
  const [storiess, setChapters] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      let { data, error } = await supabase
        .from('stories')
        .select('*');
  
      if (error) console.log();
      else if (data) {
        const filteredData = data.filter(story => story.description && story.chapters?.length > 0);
        setChapters(filteredData);
      }
    };
  
    fetchChapters();
  }, []);
  
  

  // console.log(storiess);

 return (
    <div className="flex flex-col gap-4 p-4">
        {storiess?.map((stories) => {
            const last_updated = new Date(stories.last_updated);
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            const isRecentlyUpdated = last_updated >= oneWeekAgo;

            return (
              <Link key={stories.id} href={`/story/${stories.storyurl}`}>
                <div className="flex flex-row items-center gap-4 p-4 rounded-sm">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold">{stories.title}</h2>
                      {isRecentlyUpdated && <div className="bg-blue-900 rounded p-1 inline-block text-xs ml-2">Recently Updated</div>}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stories.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
        })}
    </div>
  );
}


function ChevronRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
