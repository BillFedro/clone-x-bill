import Link from "next/link";
import Image from "next/image";
import Button from "@/app/components/buttons";
import { MdVerified } from "react-icons/md";

interface AvatarProps {
    name: string;
    username: string;
}

export default function Avatar({ username, name }: AvatarProps) {
    return (
        <div className="flex items-center justify-between py-2 rounded-full w-full cursor-pointer">
            <Link href={`/${username}`} className="flex items-center">
                <Image src="/avatar.jpg" alt="Avatar" width={40} height={40} className="rounded-full w-10 h-10" />
                <div className="ml-2 flex flex-col">
                    <p className="text-white hidden lg:flex items-center">
                        {name} <MdVerified className="ml-1 text-lg text-customColor" />
                    </p>
                    <p className="text-gray-600 hidden lg:block">@{username}</p>
                </div>
            </Link>
            <div className="ml-auto">
                <Button
                    bgColor="bg-white"
                    textColor="text-black"
                    hoverColor="hover:bg-gray-200"
                    customClass="p-2"
                >
                    Follow
                </Button>
            </div>
        </div>
    );
}
