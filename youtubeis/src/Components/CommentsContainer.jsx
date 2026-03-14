import React, { useEffect, useState } from 'react'
import { Google_Api_Key } from './Constant';
import CommentCard from './CommentCard';

const CommentsContainer = ({ videoId }) => {
    const [comments, setcomments] = useState([])
    const fetchComment = async () => {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=20&order=relevance&key=${Google_Api_Key}`);
        const data = await res.json()
        setcomments(data.items);
        console.log(data.items)
    }

    useEffect(() => {
        fetchComment();
    }, [videoId])
    return (
        <div className="mt-6 xl:w-285 bg-gray-100 dark:bg-[#272727] rounded-lg sm:w-150 sm:flex-wrap">
            <h2 className="text-lg px-2 pt-2 font-bold mb-4 text-black dark:text-white">
                {comments.length} Comments
            </h2>

            {comments.map((item) => (
                <CommentCard key={item.id} info={item} />
            ))}
        </div>
    )
}

export default CommentsContainer
