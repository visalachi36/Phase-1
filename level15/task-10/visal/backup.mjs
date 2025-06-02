import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from './logger.mjs';
import {
  compressDirectory,
  copyDirectory,
  getTimestamp,
  cleanupOldBackups,
} from './utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load config JSON dynamically
const configData = await fs.readFile('./backup-config.json', 'utf-8');
const config = JSON.parse(configData);

async function performBackup() {
  const timestamp = getTimestamp();
  const sourcePath = path.resolve(__dirname, config.sourceDir);
  const destPath = path.resolve(__dirname, config.backupDir, `backup-${timestamp}`);

  try {
    await fs.mkdir(destPath, { recursive: true });
    await copyDirectory(sourcePath, destPath);
    await compressDirectory(destPath);
    await cleanupOldBackups(path.resolve(__dirname, config.backupDir), config.maxBackups);
    await log(`Backup completed: ${destPath}`);
    console.log(`Backup completed: ${destPath}`);
  } catch (err) {
    await log(`Backup failed: ${err.message}`);
    console.error(`Backup failed: ${err.message}`);
  }
}

if (process.argv.includes('--once')) {
  await performBackup();
}

export default performBackup;
