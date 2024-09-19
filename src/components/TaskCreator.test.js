import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCreator from './TaskCreator';
import { useTaskContext } from '../service/shared/TaskContext';
import TaskType from '../models/TaskType';

// Mock the useTaskContext hook
jest.mock('../service/shared/TaskContext', () => ({
    useTaskContext: jest.fn(),
}));

describe('TaskCreator Component', () => {
    const mockAddTask = jest.fn();

    beforeEach(() => {
        // Reset the mock function before each test
        mockAddTask.mockClear();
        useTaskContext.mockReturnValue({
            addTask: mockAddTask,
        });
    });

    test('renders TaskCreator component correctly', () => {
        render(<TaskCreator />);
        
        // Check if form elements are rendered
        expect(screen.getByPlaceholderText(/Task Title/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Task Description/i)).toBeInTheDocument();
        expect(screen.getByText(/Task Creator/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    test('updates title, description, and task type on user input', () => {
        render(<TaskCreator />);
        
        // Get input fields
        const titleInput = screen.getByPlaceholderText(/Task Title/i);
        const descriptionInput = screen.getByPlaceholderText(/Task Description/i);
        const taskTypeSelect = screen.getByRole('combobox');

        // Simulate typing in the title and description inputs
        fireEvent.change(titleInput, { target: { value: 'My New Task' } });
        fireEvent.change(descriptionInput, { target: { value: 'This is a task description' } });
        fireEvent.change(taskTypeSelect, { target: { value: TaskType.WORK } });

        // Assert that the inputs are updated
        expect(titleInput.value).toBe('My New Task');
        expect(descriptionInput.value).toBe('This is a task description');
        expect(taskTypeSelect.value).toBe(TaskType.WORK);
    });

    test('calls addTask when form is submitted', () => {
        render(<TaskCreator />);
        
        // Simulate form input
        fireEvent.change(screen.getByPlaceholderText(/Task Title/i), { target: { value: 'New Task' } });
        fireEvent.change(screen.getByPlaceholderText(/Task Description/i), { target: { value: 'Task Description' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: TaskType.PERSONAL } });

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        // Expect addTask to have been called with correct values
        expect(mockAddTask).toHaveBeenCalledWith(
            'New Task',  // title
            'Task Description',  // description
            TaskType.PERSONAL,   // task type
            expect.any(String),  // taskId (generated)
            false,  // completed (always false on submit)
            true,  // active
        );
    });

    test('clears the title and description after form submission', () => {
        render(<TaskCreator />);

        // Fill in the form
        const titleInput = screen.getByPlaceholderText(/Task Title/i);
        const descriptionInput = screen.getByPlaceholderText(/Task Description/i);

        fireEvent.change(titleInput, { target: { value: 'Test Task' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        // Assert that title and description inputs are cleared
        expect(titleInput.value).toBe('');
        expect(descriptionInput.value).toBe('');
    });
});
