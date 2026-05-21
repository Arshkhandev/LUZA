export const serverConfig = {
  port: Number(process.env.LUZA_SERVER_PORT || 4545),
  allowDangerousCommands: process.env.LUZA_ENABLE_DANGEROUS_COMMANDS === "true"
};

export const electronConfig = {
  devUrl: process.env.LUZA_DESKTOP_URL || "http://localhost:3000",
  apiBaseUrl: process.env.LUZA_API_URL || "http://localhost:4545"
};
