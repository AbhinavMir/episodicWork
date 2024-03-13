"use client";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/utils/supabase/server";
import { useState, useEffect } from 'react';
import { Navbar } from "@/components/navbar";
import { useRouter } from 'next/navigation';

export function ChooseStoryChapter() {
  const [isLogged, setIsLogged] = useState(false);
  const [stories, setStories] = useState<any[]>([]);
  const [selectedStory, setSelectedStory] = useState<any>("Story");
  const [selectedChapter, setSelectedChapter] = useState<any>("Chapter");
  const router = useRouter();

  useEffect(() => {

    const checkLogin = async () => {
      const { data: user } = await supabase.auth.getUser();
      setIsLogged(!!user);
    };

    const setStateForStory = (story: string) => {
      setSelectedStory(story);
    }
    const fetchMyStories = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setStories([]);
        return;
      }
      const { data: authorData } = await supabase
        .from('authors')
        .select('author_id')
        .eq('user_id', userData.user.id)
        .single();

      const { data: storiesData } = await supabase
        .from('stories')
        .select('*')
        .eq('author_id', authorData?.author_id);


      setStories(storiesData || []);
    };

    const fetchChaptersForStory = async (story: string) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setStories([]);
        return;
      }
      const { data: authorData } = await supabase
        .from('authors')
        .select('author_id')
        .eq('user_id', userData.user.id)
        .single();

      const { data: storiesData } = await supabase
        .from('stories')
        .select('*')
        .eq('author_id', authorData?.author_id);

      const selectedStoryData = storiesData?.find((storyData: any) => storyData.title === story);
      const { data: chaptersData } = await supabase
        .from('chapters')
        .select('*')
        .eq('story_id', selectedStoryData?.id);

      setSelectedChapter(chaptersData || []);
    };

    fetchMyStories();
  }, []);

  console.log(selectedChapter);

  if (!isLogged) {
    router.push('/feed');
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px' }}>
      <div className="mr-4"> {/* Add right margin to the first dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 rounded-full" size="sm" variant="ghost">
              <div>{selectedStory}</div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Choose Story</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {stories.map((story, index) => (
              <DropdownMenuItem key={index} onClick={() => setSelectedStory(story.title)}>{story.title}</DropdownMenuItem>
            ))}

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 rounded-full" size="sm" variant="ghost">
              <div>Toggle</div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function WritingPage() {
  return (
    <div className="flex flex-col h-screen">

      <Navbar />
      <header className="p-4 border-b">
        <div className="container flex items-center gap-4">
          <Button className="rounded-full" size="icon" variant="ghost">
            <ChevronLeftIcon className="h-6 w-6" />
            <span className="sr-only">Back to documents</span>
          </Button>
          <h1 className="text-lg font-bold">
            <input
              type="text"
              className="w-2/3 p-2 text-sm rounded border bg-black shadow-inner focus:outline-none"
              defaultValue="hey"
            />
          </h1>
          <ChooseStoryChapter /> {/* Added ChooseStoryChapter component here */}
          <div className="ml-auto flex 4">
            <Button className="text-sm" variant="outline">
              Save
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container flex flex-col min-h-[calc(100vh_-_theme(spacing.24))] max-w-none gap-4 p-4">
          <div className="rounded-lg border border-gray-200 flex-1 dark:border-gray-800">
            <div className="p-4 h-[calc(100vh_-_theme(spacing.24)_-_theme(spacing.12)_-_theme(spacing.12)_-_theme(spacing.8))]">
              <textarea
                className="w-full h-full focus:outline-none bg-black"
                autoFocus
              >
                Write something...
              </textarea>
            </div>
          </div>
        </div>
      </main>
      <footer className="p-4 border-t">
        <div className="container flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Button className="rounded-full" size="icon" variant="ghost">
              <ImageIcon className="w-5 h-5" />
              <span className="sr-only">Insert image</span>
            </Button>
            <Button className="rounded-full" size="icon" variant="ghost">
              <FileIcon className="w-5 h-5" />
              <span className="sr-only">Insert file</span>
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-gray-500">0 words</span>
            <Button className="rounded-full" size="icon" variant="outline">
              <BoldIcon className="w-4 h-4" />
              <span className="sr-only">Bold</span>
            </Button>
            <Button className="rounded-full" size="icon" variant="outline">
              <ItalicIcon className="w-4 h-4" />
              <span className="sr-only">Italic</span>
            </Button>
            <Button className="rounded-full" size="icon" variant="outline">
              <UnderlineIcon className="w-4 h-4" />
              <span className="sr-only">Underline</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ChevronLeftIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ImageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function FileIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function BoldIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M14 12a4 4 0 0 0 0-8H6v8" />
      <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
    </svg>
  );
}

function ItalicIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <line x1="19" x2="10" y1="4" y2="4" />
      <line x1="14" x2="5" y1="20" y2="20" />
      <line x1="15" x2="9" y1="4" y2="20" />
    </svg>
  );
}

function UnderlineIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <path d="M6 4v6a6 6 0 0 0 12 0V4" />
      <line x1="4" x2="20" y1="20" y2="20" />
    </svg>
  );
}
