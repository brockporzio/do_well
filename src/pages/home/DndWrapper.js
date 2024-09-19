import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

const isTouchDevice = () => {
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
};

const DndWrapper = ({ children }) => {
  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      {children}
    </DndProvider>
  );
};

export default DndWrapper;
