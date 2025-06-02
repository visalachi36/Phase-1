import fs from 'fs/promises';
import path from 'path';
import tar from 'tar';

export function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

export async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

export async function compressDirectory(dir) {
  const parentDir = path.dirname(dir);
  const baseName = path.basename(dir);
  const archiveName = `${dir}.tar.gz`;

  await tar.create(
    {
      gzip: true,
      file: archiveName,
      cwd: parentDir,
    },
    [baseName]
  );
}

export async function cleanupOldBackups(backupDir, maxBackups) {
  const entries = await fs.readdir(backupDir, { withFileTypes: true });

  // Filter backups (folders starting with 'backup-' or .tar.gz files)
  const backups = [];
  for (const entry of entries) {
    if (entry.name.startsWith('backup-') || entry.name.endsWith('.tar.gz')) {
      const fullPath = path.join(backupDir, entry.name);
      const stat = await fs.stat(fullPath);
      backups.push({ name: entry.name, time: stat.ctime, fullPath });
    }
  }

  backups.sort((a, b) => a.time - b.time);

  while (backups.length > maxBackups) {
    const toDelete = backups.shift();
    await fs.rm(toDelete.fullPath, { recursive: true, force: true });
  }
}
