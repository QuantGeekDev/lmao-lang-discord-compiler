import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import logger from "./logger/logger.js";
import "./commands/commands.js";

const discordBotToken = process.env.DISCORD_TOKEN;

const log = logger("app");

log.info("Launching Discord Remindabot");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  log.success(
    `Client logged in succesfully. Logged in as ${readyClient.user.tag}`,
  );
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  await interaction.reply("Krisa Krisa ;)");

  console.log(interaction);
});

await client.login(discordBotToken);
