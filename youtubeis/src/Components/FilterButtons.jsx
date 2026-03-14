import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FilterButtons = () => {
    const scrollRef = useRef(null);

    const lists = [
        "All", "Video", "Movie", "Music", "History", "Science", "Cricket", "Funny",
        "News", "Spiritual", "Horror", "Gadget", "Study", "Fact", "Appliances",
        "All1", "Video1", "Movie1", "Music1", "History1", "Science1"
    ];

    const scroll = (direction) => {
        if (!scrollRef.current) return;

        const scrollAmount = 200;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative w-full flex items-center">

            {/* Left Arrow */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 z-10 text-black dark:text-white bg-white dark:bg-[#272727] shadow-md dark:shadow-none rounded-full p-1 hover:bg-gray-200 dark:hover:bg-[#3f3f3f] active:scale-90 transition"
            >
                <ChevronLeft />
            </button>

            {/* Scrollable List */}
            <ul
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide px-10 py-2"
            >
                {lists.map((item) => (
                    <li
                        key={item}
                        className="px-4 py-1 bg-gray-200 dark:bg-[#303030] rounded-lg font-semibold text-black dark:text-white 
                       hover:bg-black dark:hover:bg-[#505050] hover:text-white cursor-pointer 
                       transition active:scale-95"
                    >
                        {item}
                    </li>
                ))}
            </ul>

            {/* Right Arrow */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 z-10 text-black dark:text-white bg-white dark:bg-[#272727] shadow-md dark:shadow-none rounded-full p-1 hover:bg-gray-200 dark:hover:bg-[#3f3f3f] active:scale-90 transition"
            >
                <ChevronRight />
            </button>
        </div>
    );
};

export default FilterButtons;
