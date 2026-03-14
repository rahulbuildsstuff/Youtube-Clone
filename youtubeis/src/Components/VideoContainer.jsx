import { useEffect, useState } from "react";
import FilterButtons from "./FilterButtons";
import { Youtube_Api_Key } from "./Constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const VideoContainer = () => {
    const [videos, setvideos] = useState([]);
    const getVideos = async () => {
        const Video_Api = await fetch(Youtube_Api_Key)
        const data = await Video_Api.json();
        console.log(data.items);
        setvideos(data.items);
    }

    useEffect(() => {
        getVideos()
    }, [])



    return (

        <div className="flex-1 mt-20 overflow-hidden bg-white dark:bg-[#0f0f0f]">
            <FilterButtons />
            {/* videos list */}
            <div className="flex flex-wrap m-5 ">
                {videos.map((video) => {
                    return <Link to={"/watch?v=" + video.id} key={video.id}><VideoCard info={video} /></Link>
                })}
            </div>
        </div>
    );
};

export default VideoContainer;
