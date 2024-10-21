import useSWR from 'swr';
import { getNews } from '@/app/api';
import { Tweet, User } from '@/app/libs/data';
import { removeDuplicateData } from '@/app/utils';
import Article from './Article';

interface TweetsProps {
    tweets: Tweet[];
    user?: User | null;
}

const fetcher = async () => {
    const newsTop = await getNews();
    return removeDuplicateData(newsTop);
};

const Tweets = ({ tweets, user }: TweetsProps) => {
    const sortedTweets = Array.isArray(tweets)
        ? tweets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        : [];

    // Use SWR to fetch articles from the API
    const { data: articles, error: apiError } = useSWR('news', fetcher);

    //local tweets
    const renderTweets = () => {
        if (sortedTweets.length === 0) {
            return <div>No tweets found.</div>;
        }
        return sortedTweets.map((tweet) => (
            <div key={tweet.id}>
                <Article data={tweet} />
            </div>
        ));
    };

    const renderArticles = () => {
        if (apiError) {
            return <div>Error loading articles: {apiError.message}</div>;
        }

        if (!articles) {
            return <div>Loading articles...</div>;
        }

        if (articles.length === 0) {
            return <div>No articles found.</div>;
        }

        return articles.map((article) => (
            <div key={article.id}> {/* Ensure the key is unique */}
                <Article data={article} />
            </div>
        ));
    };

    return (
        <div className='w-full'>
            {/* Render local tweets */}
            <div>{renderTweets()}</div>

            {/* Render API articles */}
            <div>{renderArticles()}</div>
        </div>
    );
};

export default Tweets;
