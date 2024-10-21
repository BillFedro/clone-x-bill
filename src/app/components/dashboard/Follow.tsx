import Link from "next/link";
import Avatar from "../Avatar";
import { getUsersFromLocalStorage } from '@/app/libs/data';

export default function WhoToFollow() {
    // Get session from cookie
    const session = document.cookie.split('; ').find(row => row.startsWith('session='));
    let loggedInUserId = null;

    if (session) {
        const sessionData = JSON.parse(session.split('=')[1]);
        loggedInUserId = sessionData.userId; // Get the logged-in user's ID
    }

    // Retrieve users from local storage
    const users = getUsersFromLocalStorage();

    // Filter out the logged-in user from the list of users to display
    const filteredUsers = users.filter(user => user.id !== loggedInUserId); // Assuming user has an `id` property

    return (
        <div className="border border-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-bold">Who to follow</h2>
            {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                    <Avatar key={user.username} username={user.username} name={user.name} />
                ))
            ) : (
                <p className="text-gray-500">No users to follow</p>
            )}

            <Link href="#" className="text-customColor">
                Show more
            </Link>
        </div>
    );

}
