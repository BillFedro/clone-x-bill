import { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
    customClass?: string;
}

const Search: React.FC<SearchProps> = ({ customClass = "" }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`${customClass} border-gray-800 sticky h-auto top-0`}>
            <form className="flex items-center">
                <div className="flex items-center relative w-full">
                    <FaSearch
                        className={`absolute left-3 ${isFocused ? 'text-customColor' : 'text-gray-400'}`}
                    />  
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 bg-zinc-900 rounded-full p-2 flex-grow outline-none focus:outline-customColor"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Search;
