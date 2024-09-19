import React from "react";
import Calendar from "../../components/Calendar";
import TaskCreaktor from "../../components/TaskCreator";
import Scheduler from "../../components/Scheduler";
import { TaskProvider } from "../../service/shared/TaskContext";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import DndWrapper from "./DndWrapper";

const Home = () => {
    return (
      <TaskProvider>
        <DndWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 justify-items-center">
            <TaskCreaktor></TaskCreaktor>
            <Scheduler></Scheduler>
            <Calendar></Calendar>
          </div>
        </DndWrapper>
      </TaskProvider>
    )
  };
  
export default Home;
  