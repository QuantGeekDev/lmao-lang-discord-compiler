import { SlashCommandBuilder } from "discord.js";

const compile = new SlashCommandBuilder()
  .setName("skibbidy")
  .setDescription("Compile your '🤣' code")
  .addStringOption((option) =>
    option.setName("code").setDescription("The '🤣' code to compile"),
  );

export default compile;
