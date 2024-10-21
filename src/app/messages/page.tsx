"use client";
import React from 'react';
import Sidebar from "@/app/components/dashboard/Sidebar";
import Trends from "@/app/components/dashboard/Trends";
import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import Navbar from "../components/dashboard/Navbar";
import { LuMailPlus } from "react-icons/lu";
import Link from "next/link";
import Button from '@/app/components/buttons';
import RightColumn from "../components/rightcolumn";
import CenterColumn from '@/app/components/CenterColumn';
import { getUsersFromLocalStorage, getMessagesFromLocalStorage, User, Message, getUserById } from "../libs/data";
import { saveMessageToLocalStorage } from "@/app/libs/actions";
import Image from "next/image";

export default function MessagesPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messageContent, setMessageContent] = useState("");
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        // Get session from cookie
        const session = document.cookie.split('; ').find(row => row.startsWith('session='));
        if (session) {
            const sessionData = JSON.parse(session.split('=')[1]);
            const userId = sessionData.userId;
            if (userId) {
                const fetchedUser = getUserById(userId);
                setCurrentUser(fetchedUser || null);
            }
        }

        if (typeof window !== 'undefined') {
            const footer = document.getElementById('footer');
            if (footer) {
                footer.style.display = 'none';
            }
            setUsers(getUsersFromLocalStorage());
            setMessages(getMessagesFromLocalStorage());
        }

        document.title = `Messages / X`;
    }, []);

    const handleSendMessage = () => {
        if (!messageContent || !selectedUser || !currentUser) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: currentUser.id,
            receiverId: selectedUser.id,
            content: messageContent,
            timestamp: new Date().toISOString(),
        };

        saveMessageToLocalStorage(newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessageContent(""); // Clear input
    };

    return (
        <main className="flex md:px-24 lg:px-32 max-h-screen">
            <Sidebar />

            <CenterColumn customClass="w-full md:w-3/4 lg:w-1/2 border border-gray-800">
                <Navbar>
                    <div className="my-2 px-2">
                        <div className="flex items-center justify-between my-2">
                            <h2 className="text-xl font-bold text-white p-4">Messages</h2>
                            <div className="flex">
                                <Link href="#" className="text-white font-bold rounded-full hover:bg-gray-900 p-2">
                                    <CiSettings className="text-2xl" />
                                </Link>
                                <Link href="#" className="text-white font-bold rounded-full hover:bg-gray-900 p-2">
                                    <LuMailPlus className="text-2xl" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </Navbar>

                <div className="w-full">
                    {/* <h2 className="text-4xl font-bold">Select a User to Chat</h2> */}
                    <ul>
                        {users
                            .filter(user => user.id !== currentUser?.id)
                            .map((user) => (
                                <li key={user.id} onClick={() => setSelectedUser(user)} className="flex items-center border border-gray-800 cursor-pointer text-white p-2 rounded  hover:bg-gray-900">
                                    <Image src="/avatar.jpg" alt="Avatar" width={50} height={50} className="w-10 h-10 rounded-full mr-3" />
                                    <span className="font-semibold">{user.name}</span>
                                </li>
                            ))}
                    </ul>
                </div>
                {/* Chatbox */}
                {selectedUser && (
                    <div className="mt-4 flex flex-col h-[400px] lg:hidden">
                        <h3 className="text-xl font-bold ml-4">Chat with {selectedUser.name}</h3>
                        <div className="border-b border-gray-800 mt-4"></div>
                        <div className="p-4 flex-grow overflow-y-auto no-scrollbar">
                            {messages
                                .filter(msg =>
                                    (msg.senderId === currentUser?.id && msg.receiverId === selectedUser.id) ||
                                    (msg.senderId === selectedUser.id && msg.receiverId === currentUser?.id)
                                )
                                .map(msg => {
                                    const sender = users.find(user => user.id === msg.senderId);
                                    const senderName = sender ? sender.name : "Unknown Sender";

                                    return (
                                        <div key={msg.id} className={`p-2 ${msg.senderId === currentUser?.id ? "text-right" : "text-left"}`}>
                                            <p>{msg.content}</p>
                                            <span className="text-gray-500 text-xs">
                                                {new Date(msg.timestamp).toLocaleTimeString()} | {senderName}
                                            </span>
                                        </div>
                                    );
                                })}

                            {messages.filter(msg =>
                                (msg.senderId === currentUser?.id && msg.receiverId === selectedUser.id) ||
                                (msg.senderId === selectedUser.id && msg.receiverId === currentUser?.id)
                            ).length === 0 && (
                                    <div className="text-gray-500 text-center p-4">
                                        There are no messages to display. Start a conversation with {selectedUser.name}.
                                    </div>
                                )}
                        </div>
                        <textarea
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            className="border border-gray-800 focus:outline-none rounded p-2 w-full bg-black h-[120px]"
                            placeholder="Type your message..."
                        />
                        <Button onClick={handleSendMessage}
                            bgColor="bg-customColor"
                            customClass="mt-4 ml-4 p-2 rounded w-1/6"
                        >
                            Send
                        </Button>
                    </div>
                )}
            </CenterColumn>

            {/* Right column */}
            <RightColumn customClass="w-8/12 p-4 border-r border-gray-800">
                <div className="w-full">
                    {/* <div className="p-12 rounded-lg">
                        <h2 className="text-4xl font-bold">Select message</h2>
                        <p className="text-sm text-gray-500">Choose from your existing conversations, start a new one, or just keep swimming.</p>
                        <Button
                            bgColor="bg-customColor"
                            textColor="text-white"
                            hoverColor="hover:bg-blue-500"
                            customClass="w-1/2 mt-4 p-4"
                        >
                            New message
                        </Button>
                    </div> */}

                    {/* Chatbox */}
                    {selectedUser && (
                        <div className="mt-4 flex flex-col h-[700px]">
                            <h3 className="text-xl font-bold">Chat with {selectedUser.name}</h3>
                            <div className="border-b border-gray-800 mt-4"></div>
                            <div className="p-4 flex-grow overflow-y-auto no-scrollbar">
                                {messages
                                    .filter(msg =>
                                        (msg.senderId === currentUser?.id && msg.receiverId === selectedUser.id) ||
                                        (msg.senderId === selectedUser.id && msg.receiverId === currentUser?.id)
                                    )
                                    .map(msg => {
                                        const sender = users.find(user => user.id === msg.senderId);
                                        const senderName = sender ? sender.name : "Unknown Sender";

                                        return (
                                            <div key={msg.id} className={`p-2 ${msg.senderId === currentUser?.id ? "text-right" : "text-left"}`}>
                                                <p>{msg.content}</p>
                                                <span className="text-gray-500 text-xs">
                                                    {new Date(msg.timestamp).toLocaleTimeString()} | {senderName}
                                                </span>
                                            </div>
                                        );
                                    })}

                                {messages.filter(msg =>
                                    (msg.senderId === currentUser?.id && msg.receiverId === selectedUser.id) ||
                                    (msg.senderId === selectedUser.id && msg.receiverId === currentUser?.id)
                                ).length === 0 && (
                                        <div className="text-gray-500 text-center p-4">
                                            There are no messages to display. Start a conversation with {selectedUser.name}.
                                        </div>
                                    )}
                            </div>
                            <textarea
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                                className="border border-gray-800 focus:outline-none rounded p-2 w-full bg-black"
                                placeholder="Type your message..."
                            />
                            <Button onClick={handleSendMessage}
                                bgColor="bg-customColor"
                                customClass="mt-2 p-2 rounded w-1/6"
                            >
                                Send
                            </Button>
                        </div>
                    )}
                </div>
            </RightColumn>
        </main>
    );
}
