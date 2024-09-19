import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => {
    return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [calendarTasks, setCalendarTasks] = useState({});

    const addTask = ( task_name, description, task_type, task_id, completed, active ) => {
        const newTask = { task_name, description, task_type, task_id, completed, active };
        setTasks([...tasks, newTask]);
    };

    const addTaskToCell = (dayIndex, hour, task) => {
        const cellKey = `${dayIndex}-${hour}`;
        setCalendarTasks({
            ...calendarTasks,
            [cellKey]: task,
        });
    };

    return (
        <TaskContext.Provider value={{ tasks, calendarTasks, addTask, addTaskToCell }}>
            {children}
        </TaskContext.Provider>
    );
};
