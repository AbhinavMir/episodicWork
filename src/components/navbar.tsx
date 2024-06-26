"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabase/server";
import { get } from "http";

export function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const session = await supabase.auth.getSession();
      const user = session.data?.session?.user.id;
      if (user) {
        setLoggedIn(true);
      }
    };

    const getUserNames = async () => {
      const session = await supabase.auth.getSession();
      const user_id = session.data?.session?.user.id;
      const { data, error } = await supabase
        .from("authors")
        .select("name")
        .eq("user_id", user_id);

      if (error) {
        // console.log("error", error);
      }
      if (data) {
        // console.log(data);
        setUserName(data[0].name);
      }
    };

    getUserNames();
    checkUser();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setLoggedIn(false);
  }

  return (
    <nav className="flex flex-row w-full gap-3 items-center px-3 py-3 border-b border-gray-200 bg-gray-100 dark:bg-black">
      <Link href="/feed">
        <Button
          className="font-semibold text-base md:text-sm"
          id="for-you"
          variant="ghost"
        >
          For You
        </Button>
      </Link>
      <div className="flex-1" />
      <Button className="w-8 h-8 rounded-full" size="icon" variant="ghost">
        {loggedIn ? (
          <Button className="w-8 h-8 rounded-full" size="icon" variant="ghost">
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className="w-8 h-8 rounded-full border border-white overflow-hidden"
                  style={{
                    background: "linear-gradient(to right, #454b4e, #4DAB9A)",
                  }}
                ></div>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col items-center justify-center">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{ textAlign: "center", textDecoration: "underline" }}
                  >
                    Hi, {userName}
                  </div>

                  <Button
                    className="font-semibold text-base md:text-sm"
                    onClick={signOut}
                    variant="ghost"
                  >
                    Sign Out
                  </Button>

                  <Link href="/profile">
                    <Button
                      className="font-semibold text-base md:text-sm"
                      variant="ghost"
                    >
                      Profile
                    </Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        ) : (
          <Link href="/auth">
            <Button
              className="font-semibold text-base md:text-sm"
              variant="ghost"
            >
              Login
            </Button>
          </Link>
        )}
        <span className="sr-only">Toggle user menu</span>
      </Button>
      <Link href="/writing">
        <Button
          className="font-semibold text-base md:text-sm"
          id="write-new-chapter"
          variant="ghost"
        >
          Write New Chapter
        </Button>
      </Link>
    </nav>
  );
}
