import React from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');

const TaskModal = ({ isOpen , onRequestClose , onConfirm }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Task Complete Confirmation"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" // Background overlay
            className="bg-white w-full w-60 p-6 rounded-lg shadow-lg text-center">
        <h2 className="mt-4">Mark As Complete?</h2>
        <div>
            <button 
                onClick={onConfirm}
                className="bg-blue-500 w-16 mb-2 mx-3 mt-8 text-white p-2 w-full rounded-md hover:bg-blue-600 transition-colors focus:outline-none">Yes
            </button>
            <button 
                onClick={onRequestClose}
                className="bg-blue-500 w-16 mb-2 mx-3 mt-8 text-white p-2 w-full rounded-md hover:bg-blue-600 transition-colors focus:outline-none">Cancel
            </button>
        </div>
        </Modal>
    )
};

export default TaskModal;