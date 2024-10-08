import React, { useState } from "react";
import { useTaskContext } from "../service/shared/TaskContext";
import TaskType from "../models/TaskType";

const TaskCreator = () => {

    const { addTask } = useTaskContext();
    const [task_name, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [task_type, setTaskType] = useState(TaskType.PERSONAL);
    const [task_id, setTaskId] = useState(Math.random().toString().slice(2,10));
    const [task_complete, setCompleted] = useState(false);
    const [active, setActive] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTaskId(Math.random().toString().slice(2,10));
        setCompleted(false);
        setActive(true)
        addTask( task_name, description, task_type, task_id, task_complete, active );
        setTitle("");
        setDescription("");
    }

    const setBackgroundColor = (taskType) => {
        switch(taskType){
            case TaskType.PERSONAL: return 'bg-green-200';
            case TaskType.WORK: return 'bg-red-200';
            case TaskType.FITNESS: return 'bg-blue-200';
            case TaskType.STUDY: return 'bg-orange-200';
            case TaskType.SELF_LOVE: return 'bg-pink-200';
            default: return 'bg-white';
        }
    };

    return (
        <>
            <div className="border border-gray-800 max-w-md w-4/5  min-w-80 shadow-sm rounded-md mt-10">
                <h2 className="text-lg font-semibold mb-4 text-center mt-4">Task Creator</h2>
                <form className="grid grid-cols-1 justify-items-center" onSubmit={handleSubmit}>
                    <input
                        type= "text"
                        placeholder="Task Title"
                        value={task_name}
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
                    <select 
                        value={task_type}
                        onChange={(e) => setTaskType(e.target.value)}
                        className={`border p-2 m-2 w-5/6 rounded-sm focus:outline-none focus:ring-2 ${setBackgroundColor(task_type)}`}
                    >
                        {Object.values(TaskType).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>    
                    <button 
                        type="submit" 
                        className="bg-blue-500 w-36 mt-[120px] mb-16 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                    >   
                    Submit
                    </button>                            
                </form>
            </div>
        </>
    )
}

export default TaskCreator;