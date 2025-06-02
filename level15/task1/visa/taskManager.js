import { promises as fs } from 'fs';
const FILE_PATH = './tasks.json';

const readTasks = async () => {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
};

const writeTasks = async (tasks) => {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
  } catch (err) {
    throw new Error('Error writing to tasks file');
  }
};

export const addTask = async ({ title, description, status = 'pending', dueDate }) => {
  const tasks = await readTasks();
  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    status,
    dueDate
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  console.log('✅ Task added successfully.');
};

export const listTasks = async (filterStatus, sortByDate = false) => {
  const tasks = await readTasks();
  let filtered = filterStatus ? tasks.filter(t => t.status === filterStatus) : tasks;
  if (sortByDate) {
    filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }
  if (filtered.length === 0) {
    console.log('📭 No tasks found.');
    return;
  }
  filtered.forEach(task => {
    console.log(`📝 ${task.title} (${task.status}) - ${task.description} [Due: ${task.dueDate || 'N/A'}]`);
  });
};

export const updateTask = async (id, updates) => {
  const tasks = await readTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return console.log('❌ Task not found.');

  tasks[index] = { ...tasks[index], ...updates };
  await writeTasks(tasks);
  console.log('✅ Task updated successfully.');
};

export const deleteTask = async (id) => {
  const tasks = await readTasks();
  const updatedTasks = tasks.filter(t => t.id !== id);
  if (tasks.length === updatedTasks.length) return console.log('❌ Task not found.');

  await writeTasks(updatedTasks);
  console.log('🗑️ Task deleted successfully.');
};
