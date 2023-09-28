import Fastify from "fastify";
import { LoggerConfig } from "./lib/loggerConfig";
import { plugins } from "./plugins";

// TODO: Choose config based on `NODE_ENV`
const server = Fastify({
  logger: LoggerConfig["development"],
});

await server.setErrorHandler(function (error, request, reply) {
  if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    this.log.error(error);
    reply.status(500).send({ ok: false });
  } else {
    reply.send(error);
  }
});

await server.register(plugins);

await server.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exitCode = 1;
  }
});
