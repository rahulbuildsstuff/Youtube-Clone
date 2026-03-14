import React from 'react'
import { useSelector } from 'react-redux';

const VideoCard = ({ info = {} }) => {
    const {
        snippet = {},
        statistics = {}
    } = info;

    const {
        channelTitle,
        thumbnails = {},
        localized = {}
    } = snippet;

    const isMenuOpen = useSelector((store) => store.app.isMenuOpen)

    return (
        <div className={`m-3 bg-white dark:bg-[#272727] rounded-2xl shadow-sm hover:shadow-md dark:shadow-none transition-all duration-200 ease-out hover:bg-gray-200 dark:hover:bg-[#3f3f3f] cursor-pointer
        ${isMenuOpen ? "w-123" : "w-105"}
      `}>
            <img src={thumbnails?.medium?.url} className='rounded-2xl w-full' alt="thumbnail" />
            <ul className='px-2 pb-2 text-black dark:text-white'>
                <li className='font-bold line-clamp-2'>{localized?.title}</li>
                <li className='text-sm text-gray-600 dark:text-gray-400'>{channelTitle}</li>
                <li className='text-sm text-gray-600 dark:text-gray-400'>{statistics?.viewCount + " " + "views"}</li>
            </ul>
        </div>
    )

};


export default VideoCard
