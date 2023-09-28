/**
 * Logger's `pino-pretty` configuration,
 * having each key representing a different environment.
 */
export const LoggerConfig = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
  test: false,
};
