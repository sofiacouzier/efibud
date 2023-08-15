import config from "../config/config.js";
import LoggerService from "../services/LoggerService.js";

const logger = new LoggerService(config.logger.LOGGER)

const attachLogger = (req, res, next) => {
    req.logger = logger.logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
}


export default attachLogger;