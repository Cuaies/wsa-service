import puppeteer, { Page } from "puppeteer";
import { Article, ScraperData, ScraperOptions } from "../ts/interfaces";

/**
 * Main method for interacting with the scraper.
 */
export const runScraper = async (opts: ScraperOptions) => {
  const { url, goToOpts, fetchImages, fetchLinks } = opts;

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto(url, goToOpts);
  const scrapingData: ScraperData = { articles: [] };

  scrapingData["articles"] = await scrapeArticleCards(page);

  if (fetchImages === "true") {
    scrapingData["images"] = await scrapeImages(page);
  }

  if (fetchLinks === "true") {
    scrapingData["links"] = await scrapeLinks(page);
  }

  for (const article of scrapingData.articles) {
    if (article.articleLink === undefined) return;

    const articlePage = await browser.newPage();
    await articlePage.goto(article.articleLink, goToOpts);

    article.content = await scrapeArticle(articlePage);
  }

  await browser.close();
  return JSON.stringify(scrapingData);
};

/**
 * Simple method for scraping article cards.
 */
const scrapeArticleCards = async (page: Page): Promise<Article[]> => {
  const selector =
    "html > body > div > main > div > div > div:not(:first-child) > div";

  await page.waitForSelector(selector);

  return await page.evaluate(
    (selector) =>
      Array.from(document.querySelectorAll(selector), (el) => {
        const articleLink = el.querySelector("a")?.href;
        const imageLink = el.querySelector("img")?.src;

        const metadata = el.querySelector("div:nth-child(2) > div");
        const time = metadata?.firstChild?.textContent;
        const category = metadata?.lastChild?.textContent;

        const text = metadata?.nextSibling;
        const title = text?.firstChild?.textContent;
        const summary = text?.lastChild?.textContent;

        const author = el.querySelector("div:nth-child(3)");
        const authorAvatar = author?.querySelector("img")?.src;
        const authorText = author?.lastChild;
        const authorName = authorText?.firstChild?.textContent;
        const authorProfession = authorText?.lastChild?.textContent;

        return {
          articleLink,
          imageLink,
          time,
          category,
          title,
          summary,
          author: {
            avatar: authorAvatar,
            name: authorName,
            profession: authorProfession,
          },
        };
      }),
    selector
  );
};

/**
 * Scrapes the article page for it's text.
 */
const scrapeArticle = async (page: Page) => {
  const selector =
    "div > div > div > div > div:nth-child(2) > div > div:nth-child(3)";

  await page.waitForSelector(selector);

  return await page.evaluate((selector) => {
    const container = document.querySelector(selector);
    if (!container) return;

    const children = Array.from(container.children);

    const content = [];
    let currentHeader = "";
    let currentDescription = "";

    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      const text = element.textContent?.trim();

      if (!text) continue;

      if (text.length <= 70) {
        if (currentHeader && currentDescription) {
          content.push({
            header: currentHeader,
            description: currentDescription,
          });
          currentDescription = "";
        }
        currentHeader = text;
      } else {
        if (currentDescription) {
          currentDescription += " " + text;
        } else {
          currentDescription = text;
        }
      }
    }

    if (currentHeader) {
      content.push({
        header: currentHeader,
        description: currentDescription,
      });
    }

    return content;
  }, selector);
};

/**
 * Scrapes the images within the entire page.
 */
const scrapeImages = async (page: Page): Promise<string[]> => {
  const uniqueImages: string[] = [];

  const images = await page.evaluate(() =>
    Array.from(document.images, (e) => e.src)
  );

  images.forEach((image) => {
    if (!uniqueImages.includes(image)) {
      uniqueImages.push(image);
    }
  });

  return images;
};

/**
 * Scrapes the links within the entire page.
 */
const scrapeLinks = async (page: Page): Promise<string[]> => {
  const uniqueLinks: string[] = [];

  const links = await page.evaluate(() =>
    Array.from(document.links, (e) => e.href)
  );

  links.forEach((link) => {
    if (!uniqueLinks.includes(link)) {
      uniqueLinks.push(link);
    }
  });

  return uniqueLinks;
};
