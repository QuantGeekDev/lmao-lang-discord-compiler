import chalk from "chalk";
import "dotenv/config";
import debugCreator from "debug";

const debug = debugCreator("app:");

debug(chalk.blue("Launching application"));
