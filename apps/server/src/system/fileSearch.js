import fs from "fs/promises";
import os from "os";
import path from "path";

export async function findFiles(query) {
  if (!query) return [];

  const roots = [
    path.join(os.homedir(), "Desktop"),
    path.join(os.homedir(), "Documents"),
    path.join(os.homedir(), "Downloads")
  ];
  const needle = query.toLowerCase();
  const matches = [];

  async function walk(directory, depth = 0) {
    if (depth > 2 || matches.length >= 32) return;
    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);
        if (entry.name.toLowerCase().includes(needle)) {
          matches.push({ name: entry.name, path: fullPath, type: entry.isDirectory() ? "folder" : "file" });
        }
        if (entry.isDirectory()) await walk(fullPath, depth + 1);
      }
    } catch {
      // Protected directories are skipped.
    }
  }

  await Promise.all(roots.map((root) => walk(root)));
  return matches;
}
