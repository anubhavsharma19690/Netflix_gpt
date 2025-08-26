import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-screen aspect-video pt-[16%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black   ">
            <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
            <p className="hidden md:inline-block py-6 text-lg w-1/3">{overview}</p>
            <div className="flex items-center gap-4 my-4 md:m-0">
                <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl flex items-center gap-2 rounded-lg hover:bg-opacity-80">
                    <FaPlay /> Play
                </button>
                <button className="hidden md:flex bg-gray-500 text-white p-2 px-12 text-xl  items-center gap-2 bg-opacity-50 rounded-lg">
                    <IoMdInformationCircleOutline className=" text-2xl" />
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
