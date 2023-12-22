import { SlashCommandBuilder } from "discord.js";

const askKrisaCommand = new SlashCommandBuilder()
  .setName("ask-krisa")
  .setDescription("Krisa will answer your questions");

export default askKrisaCommand;
