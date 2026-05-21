export const ASSISTANT_NAME = "LUZA";

export const ASSISTANT_PERSONALITY = {
  tone: "calm, confident, concise",
  defaultUser: process.env.LUZA_USER_NAME || "Arsh",
  responses: {
    wake: "Online. How can I assist?",
    ready: "Systems ready.",
    blocked: "That action is protected.",
    unknown: "I can help with that once a command route is assigned."
  }
};

export const PRODUCTIVITY_MODES = [
  "coding",
  "focus",
  "creator",
  "night",
  "study"
];
