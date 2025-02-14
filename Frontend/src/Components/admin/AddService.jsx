import React from "react";

export default function AddService(){

    return(
        <div className="min-h-screen flex flex-col justify-center items-center">
            {/* <div className="h-100 flex flex-col items-center justify-center"> */}
                <h2 className="font-bold text-4xl h-[8vh] text-center">Add a service</h2>
                <form className="flex flex-col">
                    <label className="font-bold text-xl h-[5vh] ">Title</label>
                    <input 
                        type="text"
                        placeholder="Enter title"
                        className="border-2 border-gray-400 h-[6vh] w-[50vh] mb-5 pl-2"
                    />
                    <label className="font-bold text-xl h-[5vh] ">Price</label>
                    <input 
                        type="number"
                        placeholder="Enter price"
                        className="border-2 border-gray-400 h-[6vh] w-[30vh] mb-5 pl-2"
                    />
                    <label className="font-bold text-xl h-[5vh]">Description</label>
                    <textarea
                        placeholder="Write a description"
                        className="border-2 border-gray-400 h-[20vh] w-[80vh] mb-5 pl-2 pt-2 text-wrap break-words overflow-hidden"
                    />
                    <label className="font-bold text-xl h-[5vh] ">Upload image</label>
                    <input 
                        type="file"
                        className="border-2 border-gray-400 mb-5 pl-2 w-[30vh]"
                    />
                    <div className="flex flex-row justify-center">
                        <button className="bg-blue-500 text-white font-medium h-[5vh] w-[13vh] rounded-lg hover:bg-blue-600 hover:font-bold cursor-pointer" type="submit">Upload</button>
                    </div>
                </form>
            {/* </div> */}
        </div>
    )
}