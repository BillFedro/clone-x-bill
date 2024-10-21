import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/logox";
import Link from "next/link";
import { IoIosHome, IoIosSearch, IoIosNotifications, IoIosMail, IoIosBook, IoIosPeople, IoIosStar, IoIosCheckmarkCircle, IoIosMore, IoIosPerson, IoIosAdd } from "react-icons/io";
import Button from "@/app/components/buttons";
import Image from "next/image";
import { User, getUserById } from '@/app/libs/data';

const navItems = [
    { label: "", href: "/home", icon: <Logo width={26} height={26} className="p-1" /> },
    { label: "Home", href: "/home", icon: <IoIosHome size={26} /> },
    { label: "Explore", href: "/explore", icon: <IoIosSearch size={26} /> },
    { label: "Notifications", href: "/notifications", icon: <IoIosNotifications size={26} /> },
    { label: "Messages", href: "/messages", icon: <IoIosMail size={26} /> },
    { label: "Grok", href: "/grok", icon: <IoIosBook size={26} /> },
    { label: "Communities", href: "/communities", icon: <IoIosPeople size={26} /> },
    { label: "Premium", href: "/premium", icon: <IoIosStar size={26} /> },
    { label: "Verified Orgs", href: "/verified-orgs", icon: <IoIosCheckmarkCircle size={26} /> },
    { label: "Profile", href: "", icon: <IoIosPerson size={26} /> },
    { label: "More", href: "/more", icon: <IoIosMore size={26} /> },
];

export default function Sidebar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    // Logout
    const handleLogout = (e: React.MouseEvent) => {
        e.stopPropagation();

        // // delete cookie
        // const expireDate = new Date();
        // expireDate.setTime(expireDate.getTime() + (1 * 60 * 60 * 1000)); // 1 hour

        // // Set cookie expires in 1 hour
        // document.cookie = `session=; path=/; expires=${expireDate.toUTCString()};`;

        // alert("Logout successful!");
        // localStorage.removeItem("session"); // delete session from localStorage
        // router.push('/'); // redirect to landing page

        // delete session from cookie
        document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";

        // delete session from localStorage
        localStorage.removeItem("session");

        alert("Logout successful!");
        router.push('/'); // redirect to landing page

    };

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // get session from cookie
        const session = document.cookie.split('; ').find(row => row.startsWith('session='));
        if (session) {
            const sessionData = JSON.parse(session.split('=')[1]);
            const userId = sessionData.userId; // get userId from session
            if (userId) {
                const fetchedUser = getUserById(userId); // get user by id
                setUser(fetchedUser || null);
            }
        }
    }, []);

    return (
        <div className="w-2/8 sticky top-0 h-screen lg:w-3/12 p-2">
            <ul className="h-full flex flex-col justify-between items-center lg:items-start">
                {navItems.map((item) => (
                    <li key={item.label} className="flex hover:bg-gray-900 hover:rounded-full p-2 transition-all">
                        <Link href={item.label === 'Profile' ? `${user?.username}` : item.href} className="flex">
                            <div className="flex-shrink-0">{item.icon}</div>
                            <span className="ml-2 hidden lg:block">{item.label}</span>
                        </Link>
                    </li>
                ))}
                <Button
                    textColor="text-white"
                    bgColor="bg-customColor"
                    hoverColor="hover:bg-blue-500"
                    customClass="p-3 mt-2 w-[40px] lg:w-full text-xs lg:text-sm"
                >
                    <span className="hidden md:inline">Post</span>
                    <span className="inline md:hidden">
                        <IoIosAdd size={16} />
                    </span>
                </Button>

                <div
                    className="flex items-center justify-between mt-8 p-2 rounded-full w-full cursor-pointer hover:bg-gray-900 transition-all"
                    onClick={toggleDropdown}
                >
                    <div className="relative">
                        <div className="flex items-center">
                            <Image src="/avatar.jpg" alt="Avatar" width={40} height={40} className="rounded-full w-10 h-10" />
                            <div className="ml-2 flex flex-col justify-center">
                                <p className="text-white hidden lg:block">{user?.name}</p>
                                <p className="text-gray-600 hidden lg:block">@{user?.username}</p>
                            </div>
                        </div>
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute -right-22 bottom-16 w-32  lg:right-8 mt-2 lg:w-60 bg-gray-900 rounded-full shadow-lg z-10">
                            <button
                                className="block w-full text-center px-4 py-2 text-white"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </ul>
        </div >
    );
}
