/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/6xu0m1tLOiZ
 */
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="flex flex-row w-full gap-4 items-center px-4 py-4 border-b border-gray-200 bg-gray-100 dark:bg-black">
      <Button
        className="font-semibold text-base md:text-sm"
        id="for-you"
        variant="ghost"
      >
        For You
      </Button>
      <Button
        className="font-semibold text-base md:text-sm"
        id="dashboard"
        variant="ghost"
      >
        Dashboard
      </Button>
      <div className="flex-1" />
      <Button className="w-8 h-8 rounded-full" size="icon" variant="ghost">
        <Popover>
          <PopoverTrigger asChild>
            <div className="w-8 h-8 rounded-full border border-white overflow-hidden">
              <Image src="/avatar.png" alt="Avatar" width={640} height={64} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div />
            <div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button>Profile</Button>
                <Button>Settings</Button>
                <Button>Logout</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <span className="sr-only">Toggle user menu</span>
      </Button>
      <Button
        className="font-semibold text-base md:text-sm"
        id="write-new-chapter"
        variant="ghost"
      >
        Write New Chapter
      </Button>
    </nav>
  );
}
