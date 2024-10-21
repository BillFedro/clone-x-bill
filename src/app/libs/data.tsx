// user type
export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
}



// tweet type
export interface Tweet {
    id: string;
    userId: string;
    tweet: string;
    createdAt: string;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
}

// get all user
export const getUsersFromLocalStorage = (): User[] => {
    const usersJson = localStorage.getItem("users");
    if (usersJson) {
        return JSON.parse(usersJson);
    }
    return [];
};

// get user by id
export const getUserById = (id: string): User | undefined => {
    const users = getUsersFromLocalStorage();
    return users.find(user => user.id === id);
};

// get user by username
export const getProfile = (username: any): User | undefined => {
    const users = getUsersFromLocalStorage();
    return users.find(user => user.username === username);
};

// get all tweets
export const getTweets = (): Tweet[] => {
    const tweetsJson = localStorage.getItem("tweets");
    if (tweetsJson) {
        return JSON.parse(tweetsJson);
    }
    return [];
};

// get tweets by username
export const getTweetsByUsername = (username: string): Tweet[] => {
    const user = getProfile(username);
    if (!user) {
        return []; // Return an empty array if user not found
    }

    const tweets = getTweets();
    return tweets.filter(tweet => tweet.userId === user.id); // Filter tweets by userId
};
export const getTweetsById = (id: string): Tweet[] => {
    const user = getProfile(id);
    if (!user) {
        return []; // Return an empty array if user not found
    }

    const tweets = getTweets();
    return tweets.filter(tweet => tweet.userId === user.id); // Filter tweets by userId
};
export const getMessagesFromLocalStorage = (): Message[] => {
    const messagesJson = localStorage.getItem("messages");
    if (messagesJson) {
        return JSON.parse(messagesJson);
    }
    return [];
};