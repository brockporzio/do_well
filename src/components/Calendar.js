import React, { useState, useEffect} from 'react';
import { useDrop } from 'react-dnd';
import TaskType from './TaskType';


const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hoursInDay = Array.from({ length: 8 }, (_, i) => i + 1);
const hoursOfTheDay = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];

const Calendar = () => {

  const [droppedTask, setDroppedTask] = useState({});

  return (
    <div className="container border border-gray-800 rounded-md max-w-xlg mx-auto p-4 mt-10">
      <div className="h-full">
        <div className="grid grid-cols-5 gap-1 text-center font-bold ">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-2 border border-gray-300 bg-gray-100">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-0.5 text-center mt-2">
          {hoursInDay.map((hour, hourIndex) => (
            daysOfWeek.map((day, dayIndex) => (
                <TimeSlot 
                  key={`${dayIndex}-${hour}`} 
                  className="border border-gray-300"
                  dayIndex={dayIndex} 
                  hour={hour}
                  droppedTask={droppedTask}
                  setDroppedTask={setDroppedTask} 
                  hoursOfTheDay={hoursOfTheDay[hourIndex]}
                />
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

const TimeSlot = ({ dayIndex, hour, droppedTask, setDroppedTask, hoursOfTheDay}) => {
  const [{ isOver }, drop ] = useDrop(()=>({
    accept: 'Task',
    drop: (item) => {
      setDroppedTask((prevTask) => ({
        ...prevTask,
        [`${hour}-${dayIndex}`] : item.task
      }))
      // console.log(`Dropped task ${item.task.title} at hour-${hour}; day-${dayIndex}`);
      // console.log( `Task type: ${item.task.type} Task: ${item}`)
      // console.log(`Task: ${item}`)
      handleTaskAdded(item.task);
      console.log('Item task', item.task)

    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

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

  const handleTaskAdded = (task) => {
    // console.log("Action triggered only when task is added:", task);
    // Add any code you want to run when a task is added here
  };

  const task = droppedTask[`${hour}-${dayIndex}`]

  useEffect(() => {
    if (task) {
      console.log(`Dropped task ${task.title} at hour-${hour}; day-${dayIndex}`);
      console.log(`Task type: ${task.taskId }`);
    }
  }, [task, hour, dayIndex]);

  return (
    <div
      ref={drop}
      id={`hour-${hour}-day-${dayIndex}`}
      className={`relative w-full h-12 p-2 pt-4 border ${task ? setBackgroundColor(task.taskType) : 'bg-white'} ${isOver ? 'opacity-75' : ''}`}
    >
      <div className="absolute top-1 left-1 text-xxs text-gray-600">
        {hoursOfTheDay}
      </div>
      
      {task && (
        <div
          className="flex justify-center items-center h-full w-full "
          title={task.title} 
        >
          <span className="task-title text-xs w-full text-center truncate">
            {task.title}
          </span>
        </div>
      )}
    </div>
  );
};


export default Calendar;
