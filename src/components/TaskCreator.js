import React from "react";

const TaskCreator = () => {
    return (
        <>
            <div className="border border-gray-800 max-w-md shadow-sm rounded-md mt-10">
                <h2 className="text-lg font-semibold mb-4 text-center mt-4">Task Creator</h2>
                <div className="grid grid-cols-1 justify-items-center">
                    <input
                        type= "text"
                        placeholder="Task Title"
                        className="border p-2 m-2 w-5/6 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                        type= "text"
                        placeholder="Task Description"
                        className="border p-2 m-2 w-5/6 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        maxLength={400}
                        rows={3}
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 w-1/3 mt-[80px] text-white p-2 w-full rounded-md hover:bg-blue-600 transition-colors"
                    >   
                    Submit
                    </button>                                   
                </div>
                <input></input>
                <input></input>
            </div>
        </>
    )
}

export default TaskCreator;