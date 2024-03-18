"use client";
import { Button } from "@/components/ui/button";
import {
  JSX,
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  SVGProps,
} from "react";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/utils/supabase/server";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { LoadingSpinner } from "./ui/spinner";

export function WritingPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const [newStoryTitle, setNewStoryTitle] = useState("");
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const router = useRouter();

  const createNewStory = async (storyTitle: string) => {
    setIsCreatingStory(true);
    const { data: userData } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("authors")
      .select("*")
      .eq("user_id", userData?.user?.id);
    if (!error) {
      const [authorData] = data;
      const { data: storyData, error: storyError } = await supabase
        .from("stories")
        .insert([{ title: storyTitle, author_id: authorData?.author_id }]);
      if (!storyError) {
        setIsCreatingStory(false);
        // setStories((prev) => [...prev, storyData]);
        // setSelectedStory(storyData); // Set the newly created story as selected
        toast.success("Story created successfully");
      }
    }
  };

  const createNewChapter = async (chapterTitle: string) => {
    setIsCreatingStory(true);
    const { data: userData } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("authors")
      .select("*")
      .eq("user_id", userData?.user?.id);
    console.log(data);
    if (!error) {
      const [authorData] = data;
      const { data: chapterData, error: chapterError } = await supabase
        .from("chapters")
        .insert([
          {
            title: chapterTitle,
            story_id: selectedStory?.story_id,
          },
        ]);

        console.log(chapterData);
      if (!chapterError) {
        setIsCreatingStory(false);
        // setChapters((prev) => [...prev, chapterData]);
        toast.success("Chapter created successfully");
      }
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const session = await supabase.auth.getSession();
      const user = session.data?.session?.user.id;
      if (!user) {
        router.push("/auth");
      }
    };

    const fetchUserStories = async () => {
      // setIsLoading(true);
      let authorData;
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("authors")
        .select("*")
        .eq("user_id", userData?.user?.id);
      if (!error) {
        const [authorData] = data;
        const { data: stories, error: storiesError } = await supabase
          .from("stories")
          .select("*")
          .eq("author_id", authorData?.author_id);
        
        if (!storiesError) {
          setStories(stories);
        }

        setIsLoading(false);
      }

      if (error) {
        toast.error(error.message);
      }
    };

    const fetchChapterForSelectedStory = async () => {
      // setIsLoading(true);
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .eq("story_id", selectedStory?.story_id);
      console.log(data);
      if (!error) {
        setIsLoading(false);
        setChapters(data);
      }
    };

    checkLogin();
    fetchUserStories();
    if (selectedStory) {
      fetchChapterForSelectedStory();
    }
  }, [stories, selectedStory, chapters, selectedChapter]);

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                {selectedStory ? selectedStory.title : "Choose Story"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                stories.map((story) => (
                  <DropdownMenuItem key={story.id} onSelect={() => setSelectedStory(story)}>
                    {story.title}
                  </DropdownMenuItem>
                ))
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                {isCreatingStory ? (
                  <LoadingSpinner /> // Assume LoadingSpinner is a component you have
                ) : (
                  <>
                    <Input
                      placeholder="Create new story"
                      value={newStoryTitle}
                      onChange={(e) => setNewStoryTitle(e.target.value)}
                      onClick={(event) => event.stopPropagation()}
                    />
                    <Button
                      onClick={() => {
                        createNewStory(newStoryTitle);
                        setNewStoryTitle(""); // Reset the input after creating a story
                      }}
                    >
                      Create
                    </Button>
                  </>
                )}
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                {selectedChapter ? selectedChapter.title : "Choose Chapter"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {chapters.map((chapter) => (
                <DropdownMenuItem
                  key={chapter.id}
                  onSelect={() => setSelectedChapter(chapter)}
                >
                  {chapter.title}
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                <Input
                  placeholder="Create new chapter"
                  value={newChapterTitle}
                  onChange={(e) => setNewChapterTitle(e.target.value)}
                  onClick={(event) => event.stopPropagation()}
                />
                <Button
                  onClick={() => {
                    createNewChapter(newChapterTitle);
                    setNewChapterTitle(""); // Reset the input after creating a chapter
                  }}
                >
                  Create
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
                placeholder="Start writing..."
              ></textarea>
            </div>
          </div>
        </div>
      </main>
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
