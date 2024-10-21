import { cache } from "react"

export const getNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      return data.articles; // Return only the articles array (or modify as needed)
    } catch (error) {
      console.error('Error fetching news:', error);
      return undefined; // Handle error
    }
  }
  