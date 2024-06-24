import React from "react";
import { useTaskContext } from "../service/shared/TaskContext";
import Task from "./Task"; // Correct import for default export

const Scheduler = () => {
    const { tasks } = useTaskContext();

    return (
        <div className="border border-gray-800 max-w-md shadow-sm rounded-md w-80 mt-10">
            <h2>Scheduler</h2>
            <div className="grid grid-cols-1 gap-4">
                {tasks.map((task, index) => (
                    <Task key={index} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Scheduler;
