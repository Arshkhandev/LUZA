import { exec } from "child_process";

export function executeSafeCommand(command, options = {}) {
  return new Promise((resolve) => {
    exec(command, { windowsHide: true, timeout: 20000, ...options }, (error, stdout, stderr) => {
      resolve({ ok: !error, stdout, stderr, error: error?.message });
    });
  });
}
