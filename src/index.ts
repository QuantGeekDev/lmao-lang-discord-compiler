import "dotenv/config";
import axios, { AxiosResponse } from "axios";
import { Client, Events, GatewayIntentBits } from "discord.js";
import logger from "./logger/logger.js";
import "./commands/commands.js";
import { KrisaStructure } from "./types.js";

const discordBotToken = process.env.DISCORD_TOKEN;
const krisaApiUrl = process.env.KRISA_API;

const log = logger("app");

axios.defaults.baseURL = krisaApiUrl;

const generateKrisaMessage = (krisa: KrisaStructure): string => {
  const { krisaNumber, imageUrl } = krisa;
  return `**[Krisa #${krisaNumber}](${imageUrl} "Krisa")**`;
};

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

  let { data } = (await axios.get("krisas")) as AxiosResponse<{
    krisas: KrisaStructure[];
  }>;

  const krisasAmount = data.krisas.length;
  const randomNumber = Math.floor(Math.random() * krisasAmount);

  const randomKrisa = data.krisas[randomNumber];

  const krisasMessage = generateKrisaMessage(randomKrisa);

  await interaction.reply(krisasMessage);
});

await client.login(discordBotToken);
