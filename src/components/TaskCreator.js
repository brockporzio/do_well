import React, { useState } from "react";
import { useTaskContext } from "../service/shared/TaskContext";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";

const TaskCreator = () => {

    const { addTask } = useTaskContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask( title, description );
        setTitle("");
        setDescription("");
    }

    return (
        <>
            <div className="border border-gray-800 max-w-md shadow-sm rounded-md mt-10">
                <h2 className="text-lg font-semibold mb-4 text-center mt-4">Task Creator</h2>
                <form className="grid grid-cols-1 justify-items-center" onSubmit={handleSubmit}>
                    <input
                        type= "text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 m-2 w-5/6 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                        type= "text"
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                </form>
                <input></input>
                <input></input>
            </div>
        </>
    )
}

export default TaskCreator;