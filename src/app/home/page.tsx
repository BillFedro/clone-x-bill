"use client";
import { postTweet } from '@/app/libs/actions';
import Sidebar from "@/app/components/dashboard/Sidebar";
import Trends from "@/app/components/dashboard/Trends";
import Tweets from "@/app/components/dashboard/Tweets";
import { useEffect, useState } from "react";
import Button from "../components/buttons";
import Navbar from "../components/dashboard/Navbar";
import Image from "next/image";
import Link from "next/link";
// src/app/components/dashboard/Article.tsx

import RightColumn from "../components/rightcolumn";
import WhoToFollow from "../components/dashboard/Follow";
import Search from "../components/Search";
import CenterColumn from '../components/CenterColumn';
import { getTweets, getTweetsByUsername, getUserById, Tweet } from '@/app/libs/data';



export default function HomePage() {
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const footer = document.getElementById('footer');
            if (footer) {
                footer.style.display = 'none';
            }
        }

        const tweets = getTweets();
        setTweets(tweets);

        document.title = `Home / X`;
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (tweet.trim()) {
            try {
                const message = await postTweet(tweet); // Get success message
                alert(message); // Show alert for successful post
                setTweet(''); // Clear the input after posting
            } catch (error) {
                alert("Failed to post tweet."); // Show alert for error
            }
        }
    };

    return (
        <main className="flex md:px-24 lg:px-32">
            {/* Left column */}
            <Sidebar />

            {/* Center column */}
            <CenterColumn
                customClass="w-full md:w-3/4 lg:w-8/12 border border-gray-800"
            >
                <Navbar>
                    <h2 className="text-xl font-bold text-white p-4 md:hidden">Home</h2>
                    <nav className="flex items-center justify-between">
                        <Link href="#" className="text-white font-bold block w-full text-center hover:bg-gray-900 py-2">For you</Link>
                        <Link href="#" className="text-gray-500 font-bold block w-full text-center hover:bg-gray-900 py-2">Following</Link>
                    </nav>
                </Navbar>
                <div className="p-4 rounded shadow mb-4 flex justify-center">
                    <div className="flex-shrink-0">
                        <Image src="/avatar.jpg" alt="Avatar" width={50} height={50} className="w-10 h-10 rounded-full" />
                    </div>
                    <div className="flex-grow ml-2">
                        <form onSubmit={handleSubmit}>
                            <textarea
                                className="border-none focus:outline-none rounded p-2 w-full bg-black"
                                rows={4}
                                value={tweet}
                                onChange={(e) => setTweet(e.target.value)}
                                placeholder="What is happening?!"
                            ></textarea>
                            <div className="border border-gray-800"></div>
                            <div className="flex justify-end mt-2">
                                <Button
                                    type="submit"
                                    textColor="text-white"
                                    bgColor="bg-customColor"
                                    hoverColor="hover:bg-blue-500"
                                    customClass="p=2 py-2 w-1/5 mt-2 text-sm"
                                >
                                    Post
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <Tweets tweets={tweets} user={null} />
            </CenterColumn>

            {/* Right column */}
            <RightColumn
                customClass="w-2/5 p-4 border-r border-gray-800"
            >
                <Search customClass="mb-4" />
                <Trends />
                <WhoToFollow />
            </RightColumn>
        </main>
    )
}
