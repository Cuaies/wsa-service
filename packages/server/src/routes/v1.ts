import { FastifyPluginCallback } from "fastify";

export const v1: FastifyPluginCallback = (server, _, done) => {
  server.put("/", (req, res) => {});

  done();
};
