import { SlashCommandBuilder } from "discord.js";

const skibbidi = new SlashCommandBuilder()
  .setName("skibbidi")
  .setDescription("Compile your '🤣' code")
  .addStringOption((option) =>
    option.setName("code").setDescription("The '🤣' code to compile"),
  );

export default skibbidi;
