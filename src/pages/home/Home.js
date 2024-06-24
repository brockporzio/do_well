import React from "react";
import Calendar from "../../components/Calendar";
import TaskCreaktor from "../../components/TaskCreator";
import Scheduler from "../../components/Scheduler";
import { TaskProvider } from "../../service/shared/TaskContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Home = () => {
    return (
      <TaskProvider>
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 justify-items-center">
            <TaskCreaktor></TaskCreaktor>
            <Scheduler></Scheduler>
            <Calendar></Calendar>
          </div>
        </DndProvider>
      </TaskProvider>
    )
  };
  
export default Home;
  