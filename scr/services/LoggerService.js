import winston from 'winston';
export default class LoggerService {
    constructor(env) {
        this.options = {
            levels: {
                fatal: 0,
                error: 1,
                warning: 2,
                info: 3,
                http: 4,
                debug: 5,
            }
        };
        this.logger = this.createLogger(env);
    }

    createLogger = (env) => {
        switch (env) {
            case "dev":
                return winston.createLogger({
                    levels: this.options.levels,
                    transports: [
                        new winston.transports.Console({
                            level: "debug",
                            format: winston.format.simple()
                        })
                    ]
                })
            case "prod":
                return winston.createLogger({
                    levels: this.options.levels,
                    transports: [
                        new winston.transports.Console({ level: "info" }),
                        new winston.transports.File({ level: "error", filename: './errors.log' })
                    ]
                })
        }
    }
}