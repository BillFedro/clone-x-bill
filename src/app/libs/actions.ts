import { hashSync } from "bcrypt-ts";
import { compare } from "bcrypt-ts";
import { v4 as uuidv4 } from "uuid";
import { getMessagesFromLocalStorage, Message, Tweet } from "./data";


// Register user
export const registerUser = async (
  name: string,
  username: string,
  email: string,
  password: string
) => {
  // Generate a unique userId using uuid
  const userId = uuidv4();
  const user = { id: userId, name, username, email, password };

  // Encrypt password
  const hashedPassword = await hashSync(password, 10);
  user.password = hashedPassword;

  // Get users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

  // Add new user to array
  existingUsers.push(user);

  // Store users in localStorage
  localStorage.setItem("users", JSON.stringify(existingUsers));
};

// Login user
export const loginUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  // Get users from localStorage
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

  // Find user with email
  const user = existingUsers.find(
    (user: { email: string }) => user.email === email
  );

  if (user) {
    // Compare password with hashed password
    const isMatch = await compare(password, user.password);
    if (isMatch) {
      localStorage.setItem(
        "session",
        JSON.stringify({ isLoggedIn: true, userId: user.id }) // Store userId in session
      );
      return true; // Successful login
    }
  }

  return false; // Failed login
};

// post tweet
export const postTweet = async (tweet: string) => {
  const session = JSON.parse(localStorage.getItem("session") || "{}");
  const userId = session.userId;
  const id = uuidv4();

  // Check if userId exists
  if (!userId) {
    throw new Error("User is not logged in.");
  }

  // Create a new tweet object
  const newTweet = {
    id,
    userId,
    tweet,
    createdAt: new Date().toISOString(), // Timestamp for when the tweet was created
  };

  // Get existing tweets from localStorage
  const existingTweets = JSON.parse(localStorage.getItem("tweets") || "[]");

  // Add the new tweet to the existing tweets
  existingTweets.push(newTweet);

  // Store the updated tweets in localStorage
  localStorage.setItem("tweets", JSON.stringify(existingTweets));

  // Return a success message (optional)
  return "Tweet posted successfully!";
};

export const saveMessageToLocalStorage = (message: Message) => {
  const messages = getMessagesFromLocalStorage();
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));
};
