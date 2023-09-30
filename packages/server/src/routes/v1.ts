import { FastifyPluginCallback } from "fastify";
import { runScraper } from "../lib/runScraper";
import { isScraperOptions } from "../util/typeguards";

export const v1: FastifyPluginCallback = (server, _, done) => {
  server.post("/", async (req, res) => {
    if (!req.body || !isScraperOptions(req.body)) {
      res.status(400).send({ error: "Invalid request body" });
      return;
    }

    const scrapingData = await runScraper(req.body);

    if (!scrapingData) {
      res.status(500).send({ error: "Internal server error" });
      return;
    }

    // TODO: add download option
    res.send(scrapingData);
  });

  done();
};
