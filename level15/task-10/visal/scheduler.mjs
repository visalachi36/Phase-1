import cron from 'node-cron';
import performBackup from './backup.mjs';
import fs from 'fs/promises';

const configData = await fs.readFile('./backup-config.json', 'utf-8');
const config = JSON.parse(configData);

cron.schedule(config.schedule, async () => {
  console.log(`Scheduled backup started at ${new Date().toISOString()}`);
  await performBackup();
});

console.log(`Scheduled backup initialized with cron pattern: ${config.schedule}`);
