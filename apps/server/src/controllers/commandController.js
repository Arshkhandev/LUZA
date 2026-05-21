import { parseUserCommand } from "../services/commandParserService.js";
import { runSystemIntent } from "../services/systemActionService.js";
import { askOpenAI } from "../ai/openaiClient.js";
import { speakText } from "../voice/ttsService.js";

export async function executeCommand(request, response) {
  const command = request.body?.command || "";
  const intent = parseUserCommand(command);

  let result;
  if (intent.type === "ai.respond") {
    result = await askOpenAI(intent.prompt);
  } else {
    result = await runSystemIntent(intent);
  }

  const spoken = result.response || intent.response;
  speakText(spoken);

  response.json({
    ok: result.ok !== false,
    intent,
    response: spoken,
    result
  });
}
