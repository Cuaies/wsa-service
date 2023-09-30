import cache from "memory-cache";
import { FastifyPluginCallback } from "fastify";
import { runScraper } from "../lib/scraper";
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

    if (req.query.download) {
      const scrapingJSONBuffer = Buffer.from(scrapingData, "utf-8");
      res.header(
        "Content-Disposition",
        `attachment; filename=scraping-${Date.now()}.json`
      );
      res.header("Content-Type", "application/octet-stream");
      res.send(scrapingJSONBuffer);
    } else {
      res.send(scrapingData);
    }
  });

  done();
};
