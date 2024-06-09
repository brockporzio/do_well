import React from "react";
import Calendar from "../../components/Calendar";
import TaskCreaktor from "../../components/TaskCreator";
import Scheduler from "../../components/Scheduler";

const Home = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 justify-items-center">
        <TaskCreaktor></TaskCreaktor>
        <Scheduler></Scheduler>
        <Calendar></Calendar>
      </div>
    )
  };
  
export default Home;
  