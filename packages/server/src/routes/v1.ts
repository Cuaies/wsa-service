import cache from "memory-cache";
import { FastifyPluginCallback } from "fastify";
import { runScraper } from "../lib/runScraper";
import { isScraperOptions } from "../util/typeguards";

export const v1: FastifyPluginCallback = (server, _, done) => {
  server.get("/", async (req, res) => {
    if (!req.query || !isScraperOptions(req.query)) {
      res.status(400).send({ error: "Invalid request body" });
      return;
    }

    let scrapingData = null;

    if (process.env.CACHING?.toLowerCase() === "true") {
      scrapingData = cache.get(req.query.url);

      if (!scrapingData) {
        try {
          scrapingData = await runScraper(req.query);
          cache.put(req.query.url, scrapingData, 6000);
        } catch (err) {
          server.log.error(err);
          res.status(500).send({ error: "Internal server error" });
          return;
        }
      }
    } else {
      try {
        scrapingData = await runScraper(req.query);
      } catch (err) {
        server.log.error(err);
        res.status(500).send({ error: "Internal server error" });
        return;
      }
    }

    // TODO: add download option
    res.send(scrapingData);
  });

  done();
};
