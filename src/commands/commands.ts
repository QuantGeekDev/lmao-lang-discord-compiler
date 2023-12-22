import { REST, Routes, SlashCommandBuilder } from "discord.js";
import logger from "../logger/logger.js";

const log = logger("commands:");
const discordBotToken = process.env.DISCORD_TOKEN;
const discordApplicationId = process.env.DISCORD_APPLICATION_ID;

if (!discordApplicationId) {
  log.error("Error, missing Discord Application ID");
  log.error("Shutting down...");
  process.exit();
}

const commands = [
  new SlashCommandBuilder().setName("krisa").setDescription("Returns a krisa"),
];

if (!discordBotToken) {
  log.error("Error, missing Discord Bot Token");
  log.error("Shutting down...");
  process.exit();
}
const rest = new REST().setToken(discordBotToken);

try {
  await rest.put(Routes.applicationCommands(discordApplicationId), {
    body: commands,
  });
} catch (error) {
  log.error((error as Error).message);
}
