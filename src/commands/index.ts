import { REST, Routes } from "discord.js";
import logger from "../logger/logger.js";
import skibbidi from "./skibbidi.js";

const log = logger("commands:");

const discordApplicationId = process.env.DISCORD_APPLICATION_ID;

if (!discordApplicationId) {
  log.error("Error, missing Discord Application ID");
  log.error("Shutting down...");
  process.exit();
}

const discordBotToken = process.env.DISCORD_TOKEN;

if (!discordBotToken) {
  log.error("Error, missing Discord Bot Token");
  log.error("Shutting down...");
  process.exit();
}

const rest = new REST().setToken(discordBotToken);

const commands = [skibbidi];

try {
  await rest.put(Routes.applicationCommands(discordApplicationId), {
    body: commands,
  });
} catch (error) {
  log.error((error as Error).message);
}
