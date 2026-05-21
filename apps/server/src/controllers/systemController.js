import os from "os";
import { findFiles } from "../system/fileSearch.js";

export function getSystemSnapshot(_, response) {
  const cpus = os.cpus();
  response.json({
    ok: true,
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    uptime: os.uptime(),
    cpuCount: cpus.length,
    memory: {
      total: os.totalmem(),
      free: os.freemem()
    }
  });
}

export async function searchFiles(request, response) {
  const query = request.query.q || "";
  const results = await findFiles(query);
  response.json({ ok: true, results });
}
