"use client";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Trends from "@/app/components/dashboard/Trends";
import Tweets from "@/app/components/dashboard/Tweets";
import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import Navbar from "../components/dashboard/Navbar";
import Link from "next/link";
import Search from "../components/Search";
import RightColumn from "../components/rightcolumn";
import WhoToFollow from "../components/dashboard/Follow";
import CenterColumn from "../components/CenterColumn";
import { getTweets, Tweet } from "../libs/data";


export default function ExplorePage() {
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

        document.title = `Explore / X`;
    }, []);

    return (
        <main className="flex md:px-24 lg:px-32">
            {/* Left column */}
            <Sidebar />

            {/* Center column */}
            <CenterColumn
                customClass="w-full md:w-3/4 lg:w-8/12 border border-gray-800"
            >
                <Navbar>
                    <div className="my-2 px-4">
                        <div className="flex items-center justify-between my-2">
                            <Search customClass="w-10/12" />
                            <Link href="/home" className="text-white font-bold rounded-full hover:bg-gray-900 p-2">
                                <CiSettings className="text-2xl" />
                            </Link>
                        </div>
                    </div>
                    <div className="w-full">
                        <nav className="flex items-center justify-between">
                            <Link href="#" className="text-white font-bold block w-full text-center hover:bg-gray-900 py-2">For you</Link>
                            <Link href="#" className="text-gray-500 font-bold block w-full text-center hover:bg-gray-900 py-2">Trending</Link>
                            <Link href="#" className="text-gray-500 font-bold block w-full text-center hover:bg-gray-900 py-2">News</Link>
                            <Link href="#" className="text-gray-500 font-bold block w-full text-center hover:bg-gray-900 py-2">Sports</Link>
                            <Link href="#" className="text-gray-500 font-bold block w-full text-center hover:bg-gray-900 py-2">Entertaiment</Link>
                        </nav>
                    </div>
                </Navbar>
                <div className="w-full">
                    <Trends />
                </div>
                <Tweets tweets={tweets} user={null} />
            </CenterColumn>

            {/* Right column */}
            <RightColumn
                customClass="w-2/5 p-4 border-r border-gray-800"
            >
                <WhoToFollow />
            </RightColumn>
        </main >

    )
}
