import puppeteer from "puppeteer";
import { ParseContent, ScraperOptions } from "../ts/interfaces";

/**
 * Main method for interacting with the scraper.
 */
export const runScraper = async (opts: ScraperOptions) => {
  const { url, viewport, goToOpts, fetchLinks, fetchImages } = opts;
  const content: ParseContent = { h3: [], p: [] };

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  viewport && (await page.setViewport(viewport));
  await page.goto(url, goToOpts);

  const h3 = await page.evaluate(() =>
    Array.from(document.querySelectorAll("h3")).map((h3) => h3.innerText)
  );
  content["h3"] = h3;

  const p = await page.evaluate(() =>
    Array.from(document.querySelectorAll("p")).map((p) => p.innerText)
  );
  content["p"] = p;

  if (fetchLinks) {
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a")).map((link) => link.href)
    );
    content["links"] = links;
  }

  if (fetchImages) {
    const images = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img")).map((img) => img.src)
    );
    content["images"] = images;
  }

  await browser.close();
  return JSON.stringify(content);
};
