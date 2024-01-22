import { SlashCommandBuilder } from "discord.js";

const skibidi = new SlashCommandBuilder()
  .setName("skibidi")
  .setDescription("Compile your '🤣' code")
  .addStringOption((option) =>
    option.setName("code").setDescription("The '🤣' code to compile"),
  );

export default skibidi;
