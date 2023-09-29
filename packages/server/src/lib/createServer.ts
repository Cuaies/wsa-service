import Fastify from "fastify";
import { LoggerConfig } from "./loggerConfig";
import { plugins } from "../plugins";

/**
 * Creates a server instance, registers plugins, and starts to listen.
 */
export const createServer = async () => {
  const server = Fastify({
    logger: process.env.NODE_ENV ? LoggerConfig[process.env.NODE_ENV] : false,
  });

  await server.setErrorHandler(function (error, req, res) {
    if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
      this.log.error(error);
      res.status(500).send({ ok: false });
    } else {
      res.send(error);
    }
  });

  await server.register(plugins);

  await server.listen(
    { port: process.env.PORT ? parseInt(process.env.PORT) : 3000 },
    (err) => {
      if (err) {
        console.error(err);
        process.exitCode = 1;
      }
    }
  );
};
