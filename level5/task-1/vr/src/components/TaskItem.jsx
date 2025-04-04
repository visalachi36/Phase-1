import { motion } from "framer-motion";
import styles from "../styles/TaskItem.module.css";

export default function TaskItem({ task, toggleComplete, deleteTask, editTask }) {
  return (
    <motion.li
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}
    >
      <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} />
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <button onClick={() => editTask(task)}>Edit</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </motion.li>
  );
}
