import React from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1); // Example for a 30-day month

const Calendar = () => {
  return (
    <div className="container border border-gray-800 max-w-lg mx-auto p-4">
      <div className="grid grid-cols-7 gap-1 text-center font-bold">
        {daysOfWeek.map((day) => (
          <div key={day} className="p-2 border border-gray-300 bg-gray-100">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mt-2">
        {daysInMonth.map((day) => (
          <div key={day} className="p-4 border border-gray-300">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
