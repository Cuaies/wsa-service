import { fastifyHelmet } from "@fastify/helmet";
import fastifyPlugin from "fastify-plugin";
import { router } from "../routes";

/**
 * Fastify plugin to register all other plugins.
 */
export const plugins = fastifyPlugin((server, _, done) => {
  server.register(fastifyHelmet);
  server.register(router);

  done();
});
