import { SlashCommandBuilder } from "discord.js";

const askKrisaCommand = new SlashCommandBuilder()
  .setName("ask-krisa")
  .setDescription("Krisa will answer your questions")
  .addStringOption((option) =>
    option.setName("question").setDescription("The question to ask the krisa"),
  );

export default askKrisaCommand;
