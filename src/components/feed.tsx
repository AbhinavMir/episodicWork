"use client";
import Link from "next/link"
import { JSX, SVGProps } from "react"
import { useEffect, useState } from "react"
import { supabase } from "@/utils/supabase/server";

export function Feed() {
  const [chapters, setChapters] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      let { data, error } = await supabase
        .from('stories')
        .select('*');

      if (error) console.log('error', error);
      else setChapters(data);
    };

    fetchChapters();
  }, []);

  console.log(chapters);

 return (
    <div className="flex flex-col gap-4">
      {chapters?.map((chapter) => (
        <Link key={chapter.id} href={`/feed/${chapter.id}`}>
          {/* <a className="flex flex-row items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-800"> */}
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{chapter.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {chapter.description}
              </p>
            </div>
            <ChevronRightIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          {/* </a> */}
        </Link>
      ))}
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
