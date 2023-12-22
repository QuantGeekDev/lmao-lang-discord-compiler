import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import logger from "./logger/logger.js";
import "./commands/index.js";
import generateKrisaMessage from "./services/krisa/generateKrisaMessage.js";
import getRandomKrisa from "./services/krisa/getRandomKrisa.js";

const discordBotToken = process.env.DISCORD_TOKEN;

const log = logger("app");

log.info("Launching Krisa Discord Bot");

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

  switch (interaction.commandName) {
    case "krisa": {
      const randomKrisa = await getRandomKrisa();
      const krisasMessage = generateKrisaMessage(randomKrisa);

      await interaction.reply(krisasMessage);
      break;
    }
    case "ask-krisa": {
      await interaction.reply("I will answer your questions, yes");
      break;
    }
    default:
      break;
  }
});

await client.login(discordBotToken);
