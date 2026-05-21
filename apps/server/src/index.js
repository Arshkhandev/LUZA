import "dotenv/config";
import express from "express";
import cors from "cors";
import { serverConfig } from "@luza/config";
import { commandRouter } from "./routes/commands.js";
import { systemRouter } from "./routes/system.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_, response) => {
  response.json({ ok: true, service: "luza-server", version: "0.1.0" });
});

app.use("/api/commands", commandRouter);
app.use("/api/system", systemRouter);

app.listen(serverConfig.port, () => {
  console.log(`LUZA server online at http://localhost:${serverConfig.port}`);
});
