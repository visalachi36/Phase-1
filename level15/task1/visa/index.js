#!/usr/bin/env node
import { addTask, listTasks, updateTask, deleteTask } from './taskManager.js';

const [, , command, ...args] = process.argv;

const parseArgs = (args) =>
  args.reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {});

(async () => {
  const options = parseArgs(args);

  switch (command) {
    case 'add':
      await addTask(options);
      break;
    case 'list':
      await listTasks(options.status, options.sort === 'date');
      break;
    case 'update':
      await updateTask(options.id, options);
      break;
    case 'delete':
      await deleteTask(options.id);
      break;
    default:
      console.log(`❓ Unknown command. Try:
        ➕ add title=Task description=Something status=pending dueDate=2025-04-10
        📋 list [status=pending|completed] [sort=date]
        ✏️ update id=12345 title=NewTitle status=completed
        ❌ delete id=12345`);
  }
})();
