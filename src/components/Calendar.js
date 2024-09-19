import React, { useState, useEffect} from 'react';
import { useDrop } from 'react-dnd';
import { GET_TASKS_WITH_LOCATION } from '../service/graphql/graphql-service';
import { useQuery } from '@apollo/client';
import TaskType from '../models/TaskType';
import TaskLocation from '../models/TaskLocation';
import TaskModal from '../modal/CompleteModal';
import { useInsertTask, useDeActivateTask, useMarkTaskComplete } from '../service/graphql/graphql-service';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hoursInDay = Array.from({ length: 8 }, (_, i) => i + 1);
const hoursOfTheDay = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];

const Calendar = () => {

  const [droppedTask, setDroppedTask] = useState({});
  const { data, error, refetch } = useQuery(GET_TASKS_WITH_LOCATION);
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ selectedTask, setSelectedTask ] = useState(null);

  useEffect(() => {
    if (data && data.task) {
      // console.log("data.tasks: ",data.task)
         // Filter tasks where task.task_active is true
      const activeTasks = data.task.filter(task => task.task_active);
      const tasks = activeTasks.reduce((acc, task) => {
        const location = JSON.parse(task.task_location.task_location_day_hour); 
        // console.log("LOCATION: ", location)
        acc[`${location.day}-${location.hour}`] = task;
        return acc;
      }, {});
      console.log("LOOK tasks from accumulator: ", tasks)
      setDroppedTask(tasks);
    }

    if (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [data, error]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalIsOpen(true);  
  };

  const { markComplete, data: markCompleteData, loading: markCompleteLoading, error: markCompleteError } = useMarkTaskComplete();

  const handleConfirmComplete = () => {
    if (selectedTask && selectedTask.task_id) {
      markComplete(selectedTask.task_id)
      .then((result) => {
        console.log('Task marked as complete:', result);
        refetch();
      })
      .catch((err) => {
        console.error('Error marking task as complete:', err);
      });
      console.log('Completing task:', selectedTask);
      setModalIsOpen(false); 
      setSelectedTask(null);  
    }
    setModalIsOpen(false);
  };

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
                  onTaskClick={handleTaskClick}
                  refetch={refetch}
                />
            ))
          ))}
        </div>
      </div>
      <TaskModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={handleConfirmComplete}
      />
    </div>
  );
};

const TimeSlot = ({ dayIndex, hour, droppedTask, setDroppedTask, hoursOfTheDay, onTaskClick, refetch}) => {
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

  const setBackgroundColor = (taskType, isCompleted) => {
    let color;
    switch (taskType) {
      case TaskType.PERSONAL: color = isCompleted ? 'bg-green-200/50' : 'bg-green-500'; break;
      case TaskType.WORK: color = isCompleted ? 'bg-red-200/50' : 'bg-red-500'; break;
      case TaskType.FITNESS: color = isCompleted ? 'bg-blue-200/50' : 'bg-blue-500'; break;
      case TaskType.STUDY: color = isCompleted ? 'bg-orange-200/50' : 'bg-orange-500'; break;
      case TaskType.SELF_LOVE: color = isCompleted ? 'bg-pink-200/50' : 'bg-pink-500'; break;
      default: color = 'bg-white';
    }
    return color;
  };

  const { addTask, data, loading, error } = useInsertTask();


  const handleTaskAdded = (task) => {
    addTask(task.task_id, task.task_name, task.task_type, task.description, 1, JSON.stringify({day:dayIndex,hour:hour}));

    if (loading) console.log('Loading...');
    if (error) console.error('Error sending task to API:', error);
    if (data) console.log('Task sent to API. Task Id:', data.insert_task.returning[0].task_id);
  };
  
  const { deactivate, data: deactivateData, loading: deactivateLoading, error: deactivateError } = useDeActivateTask();

  const deactivateTaskHandler = async (task) => {
    if (task.task_id) {
      try {
        await deactivate(task.task_id); 
        await refetch();
      } catch (err) {
        console.error('Error deactivating task:', err);
      }
    }
  };

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
      className={`relative w-full h-12 p-2 pt-4 border ${task ? setBackgroundColor(task.task_type, task.task_complete) : 'bg-white'} ${isOver ? 'opacity-75' : ''}`}
      onClick={() => task && onTaskClick(task)}
    >
      <div className="absolute top-1 left-1 text-xxs text-gray-600">
        {hoursOfTheDay}
      </div>
      {task && (
      <div
        className="absolute top-0 right-1 text-xxs text-gray-600 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          deactivateTaskHandler(task);
          console.log('Task deleted or handle deletion logic here');
          console.log(task);
        }}
      >
        x
      </div>
    )}
      
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
