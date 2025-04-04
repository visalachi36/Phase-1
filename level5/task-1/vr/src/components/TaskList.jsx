import TaskItem from "./TaskItem";
import styles from "../styles/TaskList.module.css";

export default function TaskList({ tasks, toggleComplete, deleteTask, editTask }) {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} editTask={editTask} />
      ))}
    </ul>
  );
}
