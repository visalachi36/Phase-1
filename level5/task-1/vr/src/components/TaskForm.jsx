import { Formik, Form, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import styles from "../styles/TaskForm.module.css";

export default function TaskForm({ addTask, editingTask, setEditingTask }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.taskForm}>
      <Formik
        initialValues={{
          title: editingTask?.title || "",
          description: editingTask?.description || "",
        }}
        onSubmit={(values, { resetForm }) => {
          if (editingTask) {
            addTask({ ...editingTask, ...values });
            setEditingTask(null);
          } else {
            addTask({ id: uuidv4(), ...values, completed: false });
          }
          resetForm();
        }}
      >
        <Form>
          <Field name="title" placeholder="Task Title" required />
          <Field name="description" placeholder="Task Description" required />
          <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
        </Form>
      </Formik>
    </motion.div>
  );
}
