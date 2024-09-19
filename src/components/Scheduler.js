import React from "react";
import { useTaskContext } from "../service/shared/TaskContext";
import Task from "./Task"; // Correct import for default export

const Scheduler = () => {
    const { tasks } = useTaskContext();

    return (
        <div className="border border-gray-800 max-w-md shadow-sm rounded-md w-80 mt-10 min-h-36 max-h-[503px] overflow-y-auto">
            <h2 className="ext-lg font-semibold mb-4 text-center mt-4">Scheduler</h2>
            <div className="grid grid-cols-1 gap-4 px-6 py-2 ">
                {tasks.map((task, index) => (
                    <Task key={index} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Scheduler;
