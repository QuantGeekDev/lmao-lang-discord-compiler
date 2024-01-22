import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import logger from "./logger/logger.js";
import "./commands/index.js";
import { compileLmaoCode } from "./services/lmao/compile.js";

const discordBotToken = process.env.DISCORD_TOKEN;

const log = logger("app");

log.info("Launching LMAO Discord Bot");

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
    case "skibidi": {
      try {
        if (!interaction.options.data[0]?.value) {
          await interaction.reply("You forgot to add the code...");
          break;
        }
        const code = interaction.options.data[0].value.toString();
        const formattedSourceCode = code.replace(/\s+/g, "");
        const isVoldemort = /voldemort/i.test(code);
        if (isVoldemort) {
          const answerMessage = `You attempted to compile: \`\`\` ${formattedSourceCode} \`\`\` \ Compiler response: \n "There is just one rule and you HAD to break it, didn't you?😡😡😡😒😒 `;
          await interaction.reply(answerMessage);
          return;
        }

        const compiledCode = compileLmaoCode(code);

        const answerMessage = `👁️👄👁️ Huge Slay!\n Your source code: \`\`\`${formattedSourceCode}\`\`\` \n Here is your compiled '🤣' code :\n \`\`\`html\n ${compiledCode} \`\`\` `;
        await interaction.reply(answerMessage);

        break;
      } catch (error) {
        await interaction.reply("Error compiling lmao, please try again later");
        log.error((error as Error).message);
        break;
      }
    }
    default:
      break;
  }
});

await client.login(discordBotToken);
