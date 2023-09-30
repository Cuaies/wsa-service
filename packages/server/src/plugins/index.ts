import { fastifyHelmet } from "@fastify/helmet";
import fastifyPlugin from "fastify-plugin";
import fastifyFormbody from "@fastify/formbody";
import fastifyStatic from "@fastify/static";
import { router } from "../routes";
import path from "path";

/**
 * Fastify plugin to register all other plugins.
 */
export const plugins = fastifyPlugin((server, _, done) => {
  server.register(fastifyHelmet);
  server.register(fastifyFormbody);
  server.register(router);
  server.register(fastifyStatic, {
    root: path.resolve(path.normalize("./../client/build")),
  });

  done();
});
