import "dotenv/config";
import logger from "./logger/logger.js";

const log = logger("app");

log.info("Launching Discord Remindabot");

log.success("Client launched succesfully");

log.error("Shutting down Remindabot...");
