import React from 'react';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const hoursInDay = Array.from({ length: 8 }, (_, i) => i + 1);

const Calendar = () => {
  return (
    <div className="container border border-gray-800 max-w-lg mx-auto p-4">
      <div className="grid grid-cols-5 gap-1 text-center font-bold">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 border border-gray-300 bg-gray-100">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-0.5 text-center mt-2">
        {daysOfWeek.map((day, dayIndex) => (
          hoursInDay.map((hour) => (
            <div 
              key={`${dayIndex}-${hour}`} 
              id={`hour-${hour}-day-${dayIndex}`} 
              className="p-4 border border-gray-300">
              {/* Content can be added here if needed */}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default Calendar;
