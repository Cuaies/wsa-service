import cache from "memory-cache";
import { FastifyPluginCallback } from "fastify";
import { runScraper } from "../lib/scraper";
import {
  isScraperOptions,
  isSentimentalAnalysisOptions,
} from "../util/typeguards";
import { sentimentAnalysis } from "../lib/sentimentAnalysis";

export const v1: FastifyPluginCallback = (server, _, done) => {
  server.get("/v1", async (req, res) => {
    if (!req.query || !isScraperOptions(req.query)) {
      res.status(400).send({ error: "Invalid request body" });
      return;
    }

    let scrapingData = null;

    if (process.env.CACHING === "true") {
      scrapingData = JSON.parse(cache.get(req.query.url));

      if (scrapingData) {
        if (req.query.fetchImages !== "true") {
          if (scrapingData.images) {
            delete scrapingData.images;
          }
        } else {
          if (!scrapingData.images) {
            scrapingData = await runScraper(req.query);
            cache.put(req.query.url, scrapingData, 60000 * 1);
          }
        }

        if (req.query.fetchLinks !== "true") {
          if (scrapingData.links) {
            delete scrapingData.links;
          }
        } else {
          if (!scrapingData.links) {
            scrapingData = await runScraper(req.query);
            cache.put(req.query.url, scrapingData, 60000 * 1);
          }
        }
      } else {
        try {
          scrapingData = await runScraper(req.query);
          cache.put(req.query.url, scrapingData, 60000 * 1);
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
        res.status(500).send({ err });
        return;
      }
    }

    if (req.query.download === "true") {
      const scrapingJSONBuffer = Buffer.from(scrapingData, "utf-8");
      console.log(scrapingJSONBuffer);
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

  server.post("/v1/sentiment-analysis", async (req, res) => {
    if (
      !req.query ||
      !isSentimentalAnalysisOptions(req.query) ||
      req.query.text.length > 2048
    ) {
      res.status(400).send({ error: "Invalid request body" });
      return;
    }

    res.send(await sentimentAnalysis(req.query.text));
  });

  done();
};
