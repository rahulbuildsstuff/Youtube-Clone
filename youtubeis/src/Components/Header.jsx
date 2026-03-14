import React, { useEffect, useState } from 'react'
import { Logo_Img, User_Icon, youtube_Logo, YouTube_Suggest_Api } from './Constant'
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu, toggleTheme, userbutton } from '../utils/AppSlice';
import { cacheResults } from '../utils/SearchSlice';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([])
    const [showSuggestion, SetShowSuggestion] = useState();
    const searchCache = useSelector((store) => store.search)
    const navigate = useNavigate();
    const userstate = useSelector((store) => store.app.userstate);
    const theme = useSelector((store) => store.app.theme)


    const handleSearch = () => {
        navigate("/results?Search_Query=" + searchQuery)
    }

    useEffect(() => {
        const trimmed = (searchQuery || "").trim();
        if (!trimmed) {
            setSearchSuggestions([]);
            return;
        }
        const timer = setTimeout(() => {
            if (searchCache[trimmed]) {
                setSearchSuggestions(searchCache[trimmed]);
            } else {
                getSearchSuggestion(trimmed);
            }
        }, 200);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const getSearchSuggestion = async (query) => {
        try {
            const res = await fetch(YouTube_Suggest_Api(query));
            const json = await res.json();
            if (json.error) {
                setSearchSuggestions([]);
                return;
            }
            const suggestions = (json.items || []).map((item) => item.snippet?.title || "").filter(Boolean);
            setSearchSuggestions(suggestions);
            dispatch(cacheResults({ [query]: suggestions }));
        } catch {
            setSearchSuggestions([]);
        }
    };
    return (
        <div className='bg-white dark:bg-[#212121]'>
            <div className="flex fixed bg-white dark:bg-[#212121] items-center justify-between px-4 py-3 shadow dark:shadow-none w-full z-30 border-b border-transparent dark:border-white/10">

                {/* LEFT */}
                <div className="flex items-center mx-3">
                    <img
                        src={Logo_Img}
                        alt="menu"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => dispatch(toggleMenu())} />
                    <img
                        src={youtube_Logo}
                        alt="youtube"
                        className="h-6" />
                </div>

                {/* CENTER SEARCH */}
                <div className="flex flex-1 max-w-xl mx-4 relative">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        className="border border-gray-300 dark:border-[#303030] w-full px-4 py-2 rounded-l-full text-black dark:text-white dark:bg-[#121212] placeholder:dark:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-600"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => SetShowSuggestion(true)}
                        onBlur={() => setTimeout(() => SetShowSuggestion(false), 150)}
                    />
                    <button className="border border-gray-300 dark:border-[#303030] border-l-0 px-4 rounded-r-full text-xl bg-gray-50 dark:bg-[#303030] hover:bg-gray-100 dark:hover:bg-[#3f3f3f]">
                        <IoIosSearch onClick={handleSearch} className='text-black dark:text-white' />
                    </button>
                    {showSuggestion && searchSuggestions.length > 0 && (
                        <div className='absolute top-full left-0 right-0 mt-1 min-w-0 w-full max-h-80 overflow-y-auto py-2 px-2 bg-white dark:bg-[#282828] shadow-lg border border-gray-200 dark:border-[#303030] rounded-lg z-40'>
                            <ul>
                                {searchSuggestions.map((suggestion) => (
                                    <li
                                        key={suggestion}
                                        className='w-full text-black dark:text-white flex items-center gap-3 text-base py-2 px-2 hover:bg-gray-200 dark:hover:bg-[#3f3f3f] rounded-lg cursor-pointer'
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSearchQuery(suggestion);
                                            SetShowSuggestion(false);
                                            navigate("/results?Search_Query=" + encodeURIComponent(suggestion));
                                        }}
                                    >
                                        <IoIosSearch style={{ fontSize: "18px", flexShrink: 0 }} className="text-black dark:text-gray-400" />
                                        <span className="truncate">{suggestion}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                <img
                    src={User_Icon}
                    alt="user"
                    className="w-8 h-8 relative cursor-pointer" onClick={() => dispatch(userbutton())} />

                {userstate && <div className='absolute top-14 right-4 w-40 p-4 bg-white dark:bg-[#282828] shadow-2xl rounded-lg border border-gray-200 dark:border-[#303030] z-50'>
                    <h1 className='text-center font-bold text-black dark:text-white mb-2'>Appearance</h1>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(toggleTheme());
                        }}
                        className="w-full text-black dark:text-white py-2 text-left rounded px-2 hover:bg-gray-200 dark:hover:bg-[#3f3f3f] transition"
                    >
                        {(theme || "light").toLowerCase() === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default Header;
