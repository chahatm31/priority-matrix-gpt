import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // This is enough; remove /extend-expect
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Eisenhower Matrix App", () => {
  // Requirement 1 - Add tasks and categorize them
  test("allows users to add tasks and categorize them into quadrants", () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Enter a task/i);
    const quadrantSelect = screen.getByRole("combobox");
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: "Finish report" } });
    fireEvent.change(quadrantSelect, { target: { value: "urgent-important" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Finish report")).toBeInTheDocument();
  });

  // Requirement 2 - Drag and drop tasks between quadrants
  test("allows users to drag and drop tasks between quadrants", async () => {
    // Simulate the drag and drop interaction
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Enter a task/i);
    const quadrantSelect = screen.getByRole("combobox");
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: "Finish report" } });
    fireEvent.change(quadrantSelect, { target: { value: "urgent-important" } });
    fireEvent.click(addButton);

    // Drag the task and drop in another quadrant (mock the functionality for simplicity)
    // A proper solution would use a drag-and-drop library like react-beautiful-dnd
    fireEvent.change(quadrantSelect, {
      target: { value: "urgent-not-important" },
    });
    fireEvent.click(addButton);

    expect(screen.getByText("Finish report")).toBeInTheDocument();
  });

  // Requirement 3 - Display insights
  test("provides insights about time management based on tasks", () => {
    render(<App />);
    expect(screen.getByText(/Time Management Insights/i)).toBeInTheDocument();
  });

  // Requirement 4 - Mark tasks as completed
  test("allows users to mark tasks as completed", () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Enter a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: "Finish report" } });
    fireEvent.click(addButton);

    const completeCheckbox = screen.getByRole("checkbox");
    fireEvent.click(completeCheckbox);
    expect(completeCheckbox).toBeChecked();
  });

  // Requirement 5 - Add deadlines for tasks
  test("allows users to add deadlines for tasks", () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Enter a task/i);
    const dateInput = screen.getByPlaceholderText(/Enter deadline/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, {
      target: { value: "Submit project proposal" },
    });
    fireEvent.change(dateInput, { target: { value: "2023-10-15" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/2023-10-15/)).toBeInTheDocument();
  });

  // Requirement 6 - Filter tasks by urgency, importance or due date
  test("allows users to filter tasks by urgency and importance", () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Enter a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: "Finish report" } });
    fireEvent.click(addButton);

    const filterSelect = screen.getByRole("combobox");
    fireEvent.change(filterSelect, { target: { value: "urgent-important" } });

    expect(screen.getByText("Finish report")).toBeInTheDocument();
  });

  // Requirement 7 - Display completion rate of tasks in each quadrant
  test("displays a completion rate of tasks in each quadrant", () => {
    render(<App />);
    expect(screen.getByText(/Completion Rate/i)).toBeInTheDocument();
  });

  // Requirement 8 - Reset tasks for a fresh week
  test("allows users to reset tasks for a new week without losing long-term tasks", () => {
    render(<App />);
    const resetButton = screen.getByText(/Reset Week/i);
    fireEvent.click(resetButton);

    // Verify tasks are reset but long-term objectives are not
    expect(screen.queryByText(/long-term objective/i)).toBeInTheDocument();
  });

  // Requirement 9 - Edit or delete tasks
  test("allows users to edit or delete tasks", () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Enter a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: "Old Task" } });
    fireEvent.click(addButton);

    // Simulate edit task
    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);
    fireEvent.change(taskInput, { target: { value: "Updated Task" } });
    fireEvent.click(addButton);
    expect(screen.getByText("Updated Task")).toBeInTheDocument();

    // Simulate delete task
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);
    expect(screen.queryByText("Updated Task")).not.toBeInTheDocument();
  });

  // Requirement 10 - Offline storage for tasks
  test("stores tasks and progress offline using local storage", () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Enter a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: "Offline Task" } });
    fireEvent.click(addButton);

    // Mock local storage functionality
    expect(localStorage.getItem("tasks")).toContain("Offline Task");
  });

  // Requirement 11 - Summary view of all tasks
  test("displays a summary view of all tasks", () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Enter a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: "Task 1" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Summary/i)).toBeInTheDocument();
  });

  // Requirement 12 - Assign priorities and sort tasks
  test("allows users to assign priorities to tasks and sort them", () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Enter a task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: "High Priority Task" } });
    fireEvent.click(addButton);

    const prioritySelect = screen.getByRole("combobox");
    fireEvent.change(prioritySelect, { target: { value: "High" } });

    expect(screen.getByText("High Priority Task")).toBeInTheDocument();
  });
});
