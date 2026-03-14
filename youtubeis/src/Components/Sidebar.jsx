import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {

    const categories = ["movie", "song", "sports", "news", "cartoon", "game", "gadgets", "course"];


    return (

        <div className='w-60 h-screen mt-10 bg-gray-100 dark:bg-[#212121] px-4 fixed'>

            <ul className='p-4 text-black dark:text-white'>
                <Link to="/"><li className='bg-gray-300 dark:bg-[#303030] rounded-lg px-2 m-2 py-2 mt-20 hover:bg-gray-400 dark:hover:bg-[#3f3f3f]'> Home</li></Link>
                <li className='hover:bg-gray-300 dark:hover:bg-[#303030] rounded-lg px-2 m-2 py-2'>live</li>
                <li className='hover:bg-gray-300 dark:hover:bg-[#303030] rounded-lg px-2 m-2 py-2'>shorts</li>
                <li className='hover:bg-gray-300 dark:hover:bg-[#303030] rounded-lg px-2 m-2 py-2'>videos</li>
            </ul>
            <h1 className='font-bold px-2 text-black dark:text-white'>Subscription</h1>
            <ul className='p-4 text-black dark:text-white'>
                {categories.map((category) => {
                    return <li key={category} className='w-full hover:bg-gray-300 dark:hover:bg-[#303030] rounded-lg px-2 m-2 py-2'>{category}</li>
                })}
            </ul>
        </div>
    )
}

export default Sidebar
