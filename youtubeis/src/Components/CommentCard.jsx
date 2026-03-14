import React from 'react'

const CommentCard = ({ info }) => {
    const snippet =
        info.snippet.topLevelComment.snippet;

    const {
        authorDisplayName,
        authorProfileImageUrl,
        textDisplay,
        likeCount,
    } = snippet;

    return (
        <div className='xl:w-285 p-2 sm:w-150 flex flex-wrap'>
            <div className="flex gap-3 mb-4 py-2 px-3 border-b border-gray-400 dark:border-[#3f3f3f]">
                <img
                    src={authorProfileImageUrl}
                    alt="user"
                    className="w-10 h-10 rounded-full" loading='lazy'
                />

                <div className='w-full'>
                    <p className="font-semibold text-black dark:text-white">
                        {authorDisplayName}
                    </p>

                    <p
                        className="text-sm text-black dark:text-gray-200"
                        dangerouslySetInnerHTML={{ __html: textDisplay }}
                    />

                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        👍 {likeCount}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default CommentCard;

