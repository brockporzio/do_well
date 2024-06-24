import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { task, index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`border p-4 rounded-md shadow-sm bg-white ${
                isDragging ? 'opacity-50' : 'opacity-100'
            }`}
            style={{ cursor: 'move' }}
        >
            <h3 className="font-semibold">{task.title}</h3>
            {/* <p className="text-sm">{task.description}</p> */}
        </div>
    );
};

export default Task;
