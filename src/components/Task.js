import React from 'react';
import { useDrag } from 'react-dnd';
import TaskType from './TaskType';

const Task = ({ task, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { task, index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const setBackgroundColor = (taskType) => {
        switch(taskType){
            case TaskType.PERSONAL: return 'bg-green-200';
            case TaskType.WORK: return 'bg-red-200';
            case TaskType.FITNESS: return 'bg-blue-200';
            case TaskType.STUDY: return 'bg-orange-200';
            case TaskType.SELF_LOVE: return 'bg-pink-200';
            default: return 'bg-white';
        }
    }

    return (
        <div
            ref={drag}
            className={`border p-4 rounded-md shadow-sm bg-white ${
                isDragging ? 'opacity-50' : 'opacity-100'
            } ${setBackgroundColor(task.taskType)}`}
            style={{ cursor: 'move' }}
        >
            <h3 className="font-semibold">{task.title}</h3>
            {/* <p className="text-sm">{task.description}</p> */}
        </div>
    );
};

export default Task;
