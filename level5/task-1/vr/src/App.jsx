import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./styles/App.css";

export default function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => localStorage.setItem("tasks", JSON.stringify(tasks)), [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => (editingTask ? prevTasks.map((t) => (t.id === task.id ? task : t)) : [...prevTasks, task]));
    setEditingTask(null);
  };

  const toggleComplete = (id) => setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));

  const deleteTask = (id) => setTasks((prev) => prev.filter((task) => task.id !== id));

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} editingTask={editingTask} setEditingTask={setEditingTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} editTask={setEditingTask} />
    </div>
  );
}
