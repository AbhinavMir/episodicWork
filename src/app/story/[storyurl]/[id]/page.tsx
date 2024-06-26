"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/server";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Navbar } from "@/components/navbar";
import ReactMarkdown from 'react-markdown';

export default function Page({ params }: { params: { storyurl: string, id: string } }) {
    const [chap, setChap] = useState(null);
    const url = '/' + params.storyurl + '/' + params.id;
    
    // console.log(url);
    useEffect(() => {
        async function getChapter() {
            try {
                const { data, error } = await supabase
                    .from('chapters')
                    .select('*')
                    .eq('url', url)
                    .single();

                if (error) throw error;
                setChap(data);
            } catch (error) {
                console.error(error);
            }
        }

        getChapter();
    }
        , [params.id]);

    // console.log(chap);

    if (chap) {
        return (
            <div>
                <Navbar />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
                    > <h1>{(chap as { title: string }).title}</h1></div>
                      <ReactMarkdown>{(chap as { content: string }).content}</ReactMarkdown>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                <LoadingSpinner />
            </div>
        </div>
    );
}
