import { GoToOptions } from "puppeteer";

/**
 * Represents the options that can be passed to the scraper.
 */
export interface ScraperOptions {
  url: string;
  fetchLinks?: string;
  fetchImages?: string;
  download?: string;
  goToOpts?: GoToOptions;
}
