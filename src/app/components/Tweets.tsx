import Image from 'next/image';
import { FaRegComment, FaRetweet, FaRegHeart, FaChartBar, FaShareAlt, FaBookmark } from 'react-icons/fa';
import { Tweet, User } from '@/app/libs/data';
import { diffForHuman } from '../libs/utils';

interface DetailTweetProps {
    tweet: Tweet;
    user: User;
}

export default function DetailTweet({ tweet, user }: DetailTweetProps) {
    return (
        <div className="flex items-start p-4 border-b border-gray-800">
            <div className="flex-shrink-0">
                <Image
                    src="/avatar.jpg"
                    alt="image"
                    width={50}
                    height={50}
                    className="w-10 h-10 rounded-full"
                />
            </div>
            <div className="flex-grow ml-2">
                <p className="text-white">
                    {user.name}&nbsp;
                    <span className="text-gray-500">{user.username} | </span>
                    <span className="text-gray-500">{diffForHuman(tweet.createdAt)}</span>
                </p>
                <div className="mt-2">
                    <p className="text-gray-300">{tweet.tweet}</p>
                </div>
                <div className="flex items-center justify-start mt-4 gap-4 lg:gap-10 cursor-pointer text-sm lg:text-lg">
                    <span className="text-gray-500 flex items-center">
                        <FaRegComment className="text-gray-500 hover:text-white" />
                        <span className="ml-1">231</span>
                    </span>
                    <span className="text-gray-500 flex items-center">
                        <FaRetweet className="text-gray-500 hover:text-white" />
                        <span className="ml-1">10</span>
                    </span>
                    <span className="text-gray-500 flex items-center">
                        <FaRegHeart className="text-gray-500 hover:text-white" />
                        <span className="ml-1">41</span>
                    </span>
                    <span className="text-gray-500 flex items-center">
                        <FaChartBar className="text-gray-500 hover:text-white" />
                        <span className="ml-1">24</span>
                    </span>
                    <FaBookmark className="text-gray-500 hover:text-white" />
                    <FaShareAlt className="text-gray-500 hover:text-white" />
                </div>
            </div>
        </div>
    );
}
