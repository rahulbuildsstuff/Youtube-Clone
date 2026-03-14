import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Google_Api_Key } from './Constant';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [searchparams] = useSearchParams();
    const query = searchparams.get("Search_Query");
    console.log(query)
    useEffect(() => {
        fetchSearchResults();
    }, [query])
    const fetchSearchResults = async () => {
        if (!query) return;

        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=50&key=${Google_Api_Key}`
        );

        const data = await res.json();
        setResults(data.items);

    };

    return (
        <div className="p-6 items-center bg-white dark:bg-[#0f0f0f] min-h-screen">
            {results.map((item) => (
                <Link
                    key={item.id.videoId}
                    to={"/watch?v=" + item.id.videoId}
                    className="flex gap-4 mb-6 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-lg p-2 -m-2 transition"
                >
                    <img
                        className="w-80 rounded-lg shrink-0"
                        src={item.snippet.thumbnails.medium.url}
                        alt="thumb"
                    />

                    <div className="min-w-0">
                        <h2 className="font-semibold text-lg text-black dark:text-white">
                            {item.snippet.title}
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.snippet.channelTitle}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 line-clamp-2">
                            {item.snippet.description}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default SearchResults
