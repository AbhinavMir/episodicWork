"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/server";
import { LoadingSpinner } from "@/components/ui/spinner";
import { ChapterCard } from "@/components/chapter-card";
import { Navbar } from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    useEffect(() => {
        async function getChapter() {
            try {
                const { data, error } = await supabase
                    .from('chapters')
                    .select('*')
                    .eq('chapter_id', params.id)
                    .single();

                if (error) throw error;
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }

        getChapter();
    }
    , [params.id]);

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <LoadingSpinner />
            </div>
        </div>
    );
}
