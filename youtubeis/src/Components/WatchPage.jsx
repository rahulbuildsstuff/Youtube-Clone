import React, { useEffect, useState } from 'react';
import { closeMenu } from '../utils/AppSlice';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import { Google_Api_Key } from './Constant';
import Body from './Body';

const WatchPage = () => {
    const [videoInfo, setVideoInfo] = useState(null);
    const [showFull, setShowFull] = useState(false);
    const [searchparams] = useSearchParams();
    const videoId = searchparams.get("v");

    const dispatch = useDispatch();

    // Close menu when opening watch page
    useEffect(() => {
        dispatch(closeMenu());
    }, [dispatch]);

    // Fetch video details
    useEffect(() => {
        if (!videoId) return;

        const fetchVideoDetails = async () => {
            const res = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${Google_Api_Key}`
            );
            const data = await res.json();
            setVideoInfo(data.items[0]);
        };

        fetchVideoDetails();
    }, [videoId]);

    if (!videoInfo) return <div className="p-6 text-black dark:text-white">Loading...</div>;

    const {
        snippet: { title, description, channelTitle },
        statistics: { viewCount },
    } = videoInfo;

    return (
        <div className="flex overflow-x-hidden sm:w-150 sm:p-5 xl:w-full bg-white dark:bg-[#0f0f0f]">
            {/* Sidebar overlay */}
            <Body />

            {/* Video player and details */}
            <div className="flex-1 px-8 py-4 xl:mt-15 mt-15 aspect-video max-w-300 w-full">
                <iframe
                    className='w-full h-full rounded-lg'
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />

                <h1 className="font-bold text-xl mt-4 sm:w-130 xl:w-full text-black dark:text-white">{title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{viewCount} views</p>
                <p className="text-gray-700 dark:text-gray-300 mt-2 font-semibold">{channelTitle}</p>

                <div className="bg-gray-100 dark:bg-[#272727] p-4 rounded-lg sm:w-150 xl:w-285 xl:mt-5">
                    <p className={`whitespace-pre-line text-sm text-black dark:text-white ${showFull ? "" : "line-clamp-3"}`}>
                        {description}
                    </p>
                    {description.length > 150 && (
                        <button
                            onClick={() => setShowFull(!showFull)}
                            className="text-sm font-semibold mt-2 text-black dark:text-white hover:underline"
                        >
                            {showFull ? "Show less" : "Show more"}
                        </button>
                    )}
                </div>

                <CommentsContainer videoId={videoId} />
            </div>
        </div>
    );
};

export default WatchPage;
