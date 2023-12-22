import { SlashCommandBuilder } from "discord.js";

const krisaCommand = new SlashCommandBuilder()
  .setName("krisa")
  .setDescription("Returns a random krisa");

export default krisaCommand;
