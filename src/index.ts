import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import logger from "./logger/logger.js";
import "./commands/index.js";
import generateKrisaMessage from "./services/krisa/generateKrisaMessage.js";
import getRandomKrisa from "./services/krisa/getRandomKrisa.js";
import generateKrisaFortune from "./services/krisa/generateKrisaFortune.js";

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
      try {
        if (!interaction.options.data[0]?.value) {
          await interaction.reply("You forgot to ask the question...");
          break;
        }
        const question = interaction.options.data[0].value.toString();

        log.success(question);
        const answer = await generateKrisaFortune(question);

        const answerMessage = `🧀🐀The Krisa Oracle has replied \n *Q: ${question}* \n **A: ${answer}**`;
        await interaction.reply(answerMessage);

        break;
      } catch (error) {
        await interaction.reply(
          "Error processing request, please try again later",
        );
        log.error((error as Error).message);
        break;
      }
    }
    default:
      break;
  }
});

await client.login(discordBotToken);
