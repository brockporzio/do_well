import React, { useState, useEffect} from 'react';
import { useDrop } from 'react-dnd';
import { GET_TASKS_WITH_LOCATION } from '../service/graphql/graphql-service';
import { useQuery } from '@apollo/client';
import TaskType from '../models/TaskType';
import TaskLocation from '../models/TaskLocation';
import { useInsertTask } from '../service/graphql/graphql-service';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hoursInDay = Array.from({ length: 8 }, (_, i) => i + 1);
const hoursOfTheDay = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];

const Calendar = () => {

  const [droppedTask, setDroppedTask] = useState({});
  const { data, error } = useQuery(GET_TASKS_WITH_LOCATION);

  useEffect(() => {
    if (data && data.task) {
      console.log("data.tasks: ",data.task)
      const tasks = data.task.reduce((acc, task) => {
        // console.log("task.taskLocation", task)
        const location = JSON.parse(task.task_location.task_location_day_hour); // Parse the task location from the database
        console.log("LOCATION: ", location)
        acc[`${location.day}-${location.hour}`] = task; // Assign the task to the correct slot
        return acc;
      }, {});
      console.log("LOOK tasks from accumulator: ", tasks)
      setDroppedTask(tasks); // Populate the droppedTask state
    }

    if (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [data, error]);

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
                  dayIndex={1+dayIndex} 
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
        [`${dayIndex}-${hour}`] : item.task
      }))
      
      handleTaskAdded(item.task);
      console.log('Item task', item.task)
      console.log("TaskLocation", TaskLocation.Day);

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

  const { addTask, data, loading, error } = useInsertTask();


  const handleTaskAdded = (task) => {
    // Add task using the mutation function
    addTask(task.taskId, task.task_name, task.taskType, task.description, 1, JSON.stringify({day:dayIndex,hour:hour}));

    // Optionally, you can handle the data, loading, or error here.
    if (loading) console.log('Loading...');
    if (error) console.error('Error sending task to API:', error);
    if (data) console.log('Task sent to API. Task Id:', data.insert_task.returning[0].task_id);
  };

  console.log("***droppedtask: ", droppedTask)
  const task = droppedTask[`${dayIndex}-${hour}`]

  useEffect(() => {
    if (task) {
      // console.log(`Dropped task ${task.title} at hour-${hour}; day-${dayIndex}`);
      // console.log(`Task type: ${task.taskId }`);
    }
  }, [task, hour, dayIndex]);

  return (
    <div
      ref={drop}
      id={`hour-${hour}-day-${dayIndex}`}
      className={`relative w-full h-12 p-2 pt-4 border ${task ? setBackgroundColor(task.task_type) : 'bg-white'} ${isOver ? 'opacity-75' : ''}`}
    >
      <div className="absolute top-1 left-1 text-xxs text-gray-600">
        {hoursOfTheDay}
      </div>
      
      {task && (
        <div
          className="flex justify-center items-center h-full w-full "
          title={task.task_name} 
        >
          <span className="task-title text-xs w-full text-center truncate">
            {task.task_name}
          </span>
        </div>
      )}
    </div>
  );
};


export default Calendar;
