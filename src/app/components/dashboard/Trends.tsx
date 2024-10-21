import Link from "next/link";

export default function Trends() {
    return (
        <div className="border border-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-bold">Trends for you</h2>
            <div className="py-2">
                <p className="text-xs text-gray-500">Trending</p>
                <h3 className="text-white font-semibold">#Asnawi</h3>
                <p className="text-xs text-gray-500">50.4K posts</p>
            </div>
            <div className="py-2">
                <p className="text-xs text-gray-500">Music.Trending</p>
                <h3 className="text-white font-semibold">Liam Payne</h3>
                <p className="text-xs text-gray-500">36.8K posts</p>
            </div>
            <div className="py-2">
                <p className="text-xs text-gray-500">Sports - Trending</p>
                <h3 className="text-white font-semibold">Indonesia Vs China</h3>
                <p className="text-xs text-gray-500">70.8K posts</p>
            </div>

            <div className="py-2">
                <p className="text-xs text-gray-500">Trending in Indonesia</p>
                <h3 className="text-white font-semibold">#TumbangkanFufufafa</h3>
                <p className="text-xs text-gray-500">100K posts</p>
            </div>

            <div className="py-2">
                <p className="text-xs text-gray-500">Music.Trending</p>
                <h3 className="text-white font-semibold">#OneDirection</h3>
                <p className="text-xs text-gray-500">80K posts</p>
            </div>

            <div className="py-2">
                <p className="text-xs text-gray-500">Trending in Indonesia</p>
                <h3 className="text-white font-semibold">#Bisasekarang</h3>
                <p className="text-xs text-gray-500">40.8K posts</p>
            </div>

            <Link href="#" className="text-customColor">
                Show more
            </Link>
        </div>
    );
}
